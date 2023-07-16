AFRAME.registerComponent("target", {
    schema:{
        direction:{
            type: "map",
            default: {x: 0, y: 1, z: -1}
        },
        increment: {
            type: "number",
            default: 1
        }
    },

    update: function(){
        document.addEventListener("keyup", (e) => {
            this.data.increment = 1;
            switch(e.key){
                case "a":
                    this.data.direction.x -= this.data.increment;
                    break;
                case "d":
                    this.data.direction.x += this.data.increment;
                    break;
                case "w":
                    this.data.direction.y += this.data.increment;
                    break;
                case "s":
                    this.data.direction.x += this.data.increment;
                    break;
                default:
                    break;
            }
            console.log(this.data.direction);
        })

        document.addEventListener("mousedown", (e) => {
            console.log("shoot");
            var el = document.querySelector('#ball');
            el.body.applyImpulse(
            /* impulse */        new CANNON.Vec3(this.data.direction.x * 2, this.data.direction.y * 4, this.data.direction.z * 2),
            /* world position  new CANNON.Vec3().copy(el.getComputedAttribute('position'))*/
            );
       })
    },
   
    tick:function(){
        let target = document.querySelector("#target");
        let pos = target.getAttribute("position");
        let {direction} = this.data;
        target.removeChild(document.querySelector("#tline"))

        if(this.data.direction.x < -5)   this.data.direction.x = -5;
        if(this.data.direction.x > 5)  this.data.direction.x = 5;
        
        

        let line = document.createElement("a-entity");
        line.setAttribute("line", {
            start: pos,
            end: {x: pos.x + (direction.x * 2), y: pos.y + (direction.y * 2), z: pos.z + (direction.z * 2)}
        });
        line.setAttribute("id", "tline");

        target.appendChild(line);
    }
})