
class root {

    constructor(){
        this.canvas1 = document.querySelector('#devide');
        this.canvas2 = document.querySelector('#newton');
        let ctx1 = this.canvas1.getContext('2d');
        let ctx2 = this.canvas2.getContext('2d');
        this.width = this.canvas1.width;
        this.height = this.canvas1.height;
        this.x_slide = this.width*0.75;
        this.newton_tmp = this.width;
        ctx1.fillStyle = 'black';

        let x = [];
        let y = [];
        let y_dif = [];
        for(let i=0; i<=this.width; i++){
            x.push(i);
            y.push(this.func(i));
        }

        // 座標軸とグラフの描画
        this.cross(ctx1);
        this.drawLine(x, y, ctx1);
        this.cross(ctx2)
        this.drawLine(x, y, ctx2);
        this.drawLine(x, y_dif, ctx2);

    }


    func(x) {
        x = x+50;
        return -(x * x / this.width -200)
    }
    
    calc_grad(x){
        x = x+50;
        return -x * 2 / this.width;
    }

    func_tang(grad, x, a){
        return grad * (x-a) + this.func(a)
    }

    drawLine(x, y, ctx){

        for(let i=0; i<x.length-1; i++){
            ctx.moveTo(x[i], y[i]+this.height/2)
            ctx.lineTo(x[i+1], y[i+1]+this.height/2)
            ctx.stroke()
        }
    }

    cross(ctx){
        ctx.strokeStyle="black";
        ctx.beginPath();
        ctx.moveTo(this.width/20, 0);
        ctx.lineTo(this.width/20, this.height);
        ctx.moveTo(0, this.height/2);
        ctx.lineTo(this.width, this.height/2);
        ctx.stroke();
    }

    bisection(coord, ctx){
        ctx.lineWidth = 1;
        ctx.strokeStyle="red";
        ctx.beginPath();
        ctx.moveTo(coord[0], 0);
        ctx.lineTo(coord[0], this.height);
        ctx.stroke();
        ctx.strokeStyle="blue";
        ctx.beginPath();
        ctx.moveTo(coord[1], 0);
        ctx.lineTo(coord[1], this.height);
        ctx.stroke();

        // 中点c
        let c = (coord[0] + coord[1]) / 2;

        // f(a)f(c) < 0
        if(this.func(c) * this.func(coord[0]) < 0){
            coord[1] = c;
        }
        // f(a)f(c) >= 0
        else{
            coord[0] = c;
        }
        return c
    }

    newton(a, ctx){
        ctx.lineWidth = 1;
        ctx.strokeStyle="red";
        ctx.beginPath();
        ctx.moveTo(a, 0);
        ctx.lineTo(a, this.height);
        ctx.stroke();
        
        let x = [];
        let y = [];
        const grad = this.calc_grad(a);
        for(let i=0; i<this.width; i++){
            x.push(i);
            y.push(this.func_tang(grad, i, a))
        }

        this.drawLine(x, y, ctx);
        a = a - this.func(a) / grad
        return a
    }

    useBisection(coord, ctx){
        c = this.bisection(coord, ctx);
        return c
    }

    autoBisection(coord, ctx, epsilon){
        let count = 0;
        console.log(epsilon);
        while(Math.abs(coord[1]-coord[0]) > epsilon){ 
            c = this.bisection(coord, ctx);
            count += 1;
        }
        return [c,count]
    }

    useNewton(a_newton, ctx){
        a_newton = this.newton(a_newton, ctx);
        return a_newton
    }

    autoNewton(a_newton, ctx, epsilon){
        let count = 0;
        while(Math.abs(this.newton_tmp-a_newton) > epsilon){ 
            this.newton_tmp = a_newton;
            a_newton = this.newton(a_newton, ctx);
            count += 1;
        }
        return [a_newton,count]
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let r = new root()
})