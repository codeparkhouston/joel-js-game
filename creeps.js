function Creep(pos, player){
	var that = this;
	this.type = 'creep';
	this.pos = pos;
	this.base_damage = 5;
	this.target = player
	this.dir = player.pos.cp().mul(-1)
	this.vel = new Vector(player.pos.x - pos.x, player.pos.y - pos.y).normalize().mul(100);
	this.maxSpeed = 100;
	this.img = app.creepImage;
	this.life = 100;
	this.last_hit_by = false;
	this.getRect = function(){
		return {
			x: that.pos.x || 10,
            y: that.pos.y || 10,
            width: 50,
            height: 38
		}
		
	}
    var timeBetweenFire = 1500; // how many milliseconds between shots
    this.last_fired = false;
	this.update = function(){
		if (this.life < 1){
			utils.arrayRemove(app.creeps, utils.indexOf(app.creeps, this));
			this.last_hit_by.kills += 1;
			utils.addParticles(this.pos);
			return;
		}
		this.pos.add(this.vel.mulNew(app.tDelta));
		if (Math.floor(Math.random() * 100) > 95){
		  this.vel = new Vector(this.target.pos.x - this.pos.x , this.target.pos.y - this.pos.y).normalize().mul(200);	
		}
		
		if (app.now - this.last_fired > timeBetweenFire) {
		  this.dir = new Vector(this.target.pos.x - this.pos.x , this.target.pos.y - this.pos.y).normalize();
		  this.last_fired = app.now;
		  app.bullets.push(new Bullet(this, 200, this.type));
		}
        utils.boundsCheck(this);
            if (this.vel.len() > this.maxSpeed) {
                this.vel.setLength(this.maxSpeed);
            }
	}
	
}
