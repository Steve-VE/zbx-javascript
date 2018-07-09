class HaloContainer{ // Class qui contient les halo lumineux et va mettre à jour le style de l'élément HTML
    constructor(p_html, p_parameters = undefined){
        this.container = p_html;
        this.haloLights = [];
        this.direction = 0;
        this.haloColors = undefined;
        this.backgroundColors = undefined;
        this.parameters = undefined;

        if(p_parameters !== undefined){
            this.parameters = p_parameters;
        }

        // On ajoute les halo lumineux au containers
        const nbreOfHalo = random(8, 12);
        
        while(this.haloLights.length < nbreOfHalo){
            this.createNewHalo();
        }
    }

    update(){ // À appeller à chaque frame pour que le container fonctionne correctement
        this.direction += 0.1;

        for(let i = (this.haloLights.length - 1); i >= 0; i--){
            this.haloLights[i].update();
        }
    }
    render(){ // À appeller pour afficher le résultat en background de l'élément HTML
        let backgroundStyle = "";

        for(let i = (this.haloLights.length - 1); i >= 0; i--){
            backgroundStyle += this.haloLights[i].gradient;
            backgroundStyle += ", ";
        }
        backgroundStyle += "linear-gradient(" + this.direction + "deg, rgb(0, 0, 0) 0%, rgb(0, 20, 50) 100%)";

        this.container.style.backgroundImage = backgroundStyle;
    }
    defineColors( newColors ){
        if(this.haloColors === undefined || this.haloColors === null){
            this.haloColors = [];
        }

        if(typeof(newColors) == "string"){
            this.haloColors.push(newColors);
        }
        else if(typeof(newColors) == "object"){
            // Todo
        }
        return false;
    }
    defineBackgroundColors( newBackgroundColors){
        if(this.backgroundColors === undefined || this.backgroundColors === null){
            this.backgroundColors = [];
        }

        if(typeof(newBackgroundColors) == "string"){
            this.backgroundColors.push(newBackgroundColors);
        }
        else if(typeof(newBackgroundColors) == "object"){
            // Todo
        }
        return false;
    }

    createNewHalo(parameters = undefined){
        if(parameters !== undefined){
            this.haloLights.push( new HaloLight(parameters) );
        }
        else if(this.parameters !== undefined){
            this.haloLights.push( new HaloLight(this.parameters) );
        }
        else{
            this.haloLights.push( new HaloContainer() );
        }
    }
}

class HaloLight{ // Class qui représente un halo lumineux
    constructor(parameters){
        this.x = random(0, 100);
        this.y = random(0, 100);

        this.size = random(1, 25);
        this.speed = (25 - this.size) / 128;

        this.direction = Math.round(Math.random() * 35) + 10;
        

        this.red = Math.round(Math.random() * 20 + 100);
        this.green = Math.round(Math.random() * 20 + 200);
        this.blue = Math.round(Math.random() * 20 + 235);
        this.alpha = ((25 - (this.size)) / 50);

        if(parameters !== undefined && parameters !== null && typeof(parameters) === "object" ){
            const parametersKey = ['x', 'y', 'size', 'speed', 'direction', 'red', 'green', 'blue', 'alpha'];
            parametersKey.forEach((key)=>{
                if(key in parameters){
                    this[key] = parameters[key];
                }
            });
        }

        this.direction = radians(this.direction);
    }

    update(){
        this.direction += (Math.random() - 0.5) / 10;
        this.direction = constrain(this.direction, radians(12), radians(78));

        this.x += Math.cos(this.direction) * this.speed;
        this.y -= Math.sin(this.direction) * this.speed;

        this.x = this.warp(this.x);
        this.y = this.warp(this.y);

    }

    get gradient(){ // Retourne le 'radial-gradient' (CSS)
        let strGradient = "radial-gradient(";
        strGradient += "circle at " + this.x + "% " + this.y + "%, ";
        strGradient += this.color + " 0%, ";
        strGradient += this.rgba(this.alpha / 2) + " " + (this.size / 2) + "%, ";
        strGradient += this.rgba(0) + " " + this.size + "%";
        strGradient += ") ";
        return strGradient;
    }

    get color(){ // Retourne la couleur en 'rgba' (CSS)
        return "rgba( " + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
    }

    rgba(p_alpha = 1){ // Retourne la couleur en 'rgba' (CSS) avec un alpha différent
        return "rgba( " + this.red + ", " + this.green + ", " + this.blue + ", " + p_alpha + ")";
    }

    warp(pos) {
        if(pos > 100 + (this.size * 2)){
            pos = -(this.size * 2);
        }else if(pos < -(this.size * 2)){
            pos = 100 + (this.size * 2);
        }
        return pos;
    }
}