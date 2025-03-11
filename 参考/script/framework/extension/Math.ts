interface Math {
    intRange(min : number, max : number) : number;
    lerp(from : number, to : number, t : number) : number;
}

Math.intRange = function(min : number, max : number){
    let range = max - min;
    let value = Math.round(Math.random() * range);
	return value + min;
};

Math.lerp = function(from : number, to : number, t : number) {
    return from + (to - from) * t;
}