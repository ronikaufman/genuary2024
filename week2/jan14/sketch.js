/*
Genuary 2024
JAN.14 "Less than 1KB artwork."
By Roni Kaufman
https://ronikaufman.github.io
*/

setup=_=>{createCanvas(w=1500,w);stroke(w);R=random;background("#6c93df");o=[];for(i=1e4;i--;){x=R(w);y=R(w);r=w;for(c of o)(d=dist(x,y,c.x,c.y)-c.r)<r?r=d:0;if(r>75){r=min(r,225);o.push({x:x,y:y,r:r});r-=15;C=circle;fill(w/2);rect(x-r,y-(h=r/10),2*r,2*h,r);C(x-r/3,y-2*h,r/2);C(x+r/9,y-4*h,r*.8);C(x+r/2,y-3*h,r/2);C(x+r*.7,y-h,r/3)}}}