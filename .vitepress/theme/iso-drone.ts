/** Isometric projection adapted from ISO-GLOW / iso-figure (MIT).
 * A generic illustration: dimensions describe this drawing, not a real aircraft.
 */
export type Point = readonly [number, number, number];
const C = Math.cos(Math.PI / 6);
const S = Math.sin(Math.PI / 6);
export const project = ([x, y, z]: Point) => [(x - y) * C + 340, (x + y) * S - z + 90];
function plane(origin: Point, u: Point, v: Point) {
  const o = project(origin);
  const vector = ([x, y, z]: Point) => [(x - y) * C, (x + y) * S - z];
  const a = vector(u), b = vector(v);
  return `matrix(${a[0]} ${a[1]} ${b[0]} ${b[1]} ${o[0]} ${o[1]})`;
}
export const top = (x: number, y: number, z: number) => plane([x,y,z], [1,0,0], [0,1,0]);
const front = (x: number, y: number, z: number) => plane([x,y,z], [1,0,0], [0,0,-1]);
const side = (x: number, y: number, z: number) => plane([x,y,z], [0,-1,0], [0,0,-1]);
function box(x: number, y: number, z: number, w: number, d: number, h: number, name = '') {
  return `<g class="iso-part ${name}"><rect class="iso-wall" transform="${front(x,y+d,z+h)}" width="${w}" height="${h}"/><rect class="iso-side" transform="${side(x+w,y+d,z+h)}" width="${d}" height="${h}"/><rect class="iso-deck" transform="${top(x,y,z+h)}" width="${w}" height="${d}"/></g>`;
}
function motor(x: number, y: number, z: number) {
  const [cx, cy] = project([x,y,z]);
  let svg = `<g class="iso-motor"><ellipse class="iso-motor-wall" cx="${cx}" cy="${cy+8}" rx="15.6" ry="9"/><path class="iso-motor-wall" d="M${cx-15.6} ${cy}v8h31.2v-8"/><circle class="iso-metal" transform="${top(x,y,z)}" r="18"/><circle class="iso-inset" transform="${top(x,y,z)}" r="11"/>`;
  for (let i=0; i<8; i++) {
    const a=i*Math.PI/4;
    const p=project([x+14*Math.cos(a),y+14*Math.sin(a),z]);
    svg+=`<circle class="iso-detail" cx="${p[0]}" cy="${p[1]}" r="1"/>`;
  }
  return svg+'</g>';
}
const rotors = [[53,53],[223,53],[53,223],[223,223]] as const;
function arm(x: number, y: number) {
  const angle = Math.atan2(y-138, x-138);
  const u: Point = [Math.cos(angle), Math.sin(angle), 0];
  const v: Point = [-Math.sin(angle), Math.cos(angle), 0];
  const origin: Point = [138+24*u[0]-6*v[0],138+24*u[1]-6*v[1],37];
  const point = (du: number, dv: number, dz: number): Point => [origin[0]+du*u[0]+dv*v[0],origin[1]+du*u[1]+dv*v[1],origin[2]+dz];
  const cap = u[0]+u[1]>0 ? 96 : 0;
  const wall = v[0]+v[1]>0 ? 12 : 0;
  return `<g class="iso-part iso-arm"><rect class="iso-wall" transform="${plane(point(0,wall,8),u,[0,0,-1])}" width="96" height="8"/><rect class="iso-side" transform="${plane(point(cap,0,8),v,[0,0,-1])}" width="12" height="8"/><rect class="iso-deck" transform="${plane(point(0,0,8),u,v)}" width="96" height="12"/></g>`;
}
export function airframe() {
  let svg=box(113,111,12,12,54,14,'iso-leg')+box(153,111,12,12,54,14,'iso-leg');
  for(const [x,y] of rotors) svg+=arm(x,y);
  svg+=box(102,100,26,72,76,18,'iso-centre');
  for(const [x,y] of rotors) svg+=motor(x,y,55);
  return svg;
}
export function upperDeck() {
  let svg=box(103,101,45,70,74,10,'iso-cover');
  svg+=`<g transform="${top(103,101,55)}"><rect class="iso-inset" x="12" y="8" width="46" height="56" rx="5"/><rect class="iso-detail" x="20" y="16" width="30" height="12" rx="2"/>`;
  for(let y=36;y<=52;y+=4)svg+=`<path class="iso-detail" d="M20 ${y}h30"/>`;
  for(const [x,y] of [[5,5],[65,5],[5,69],[65,69]])svg+=`<circle class="iso-fastener" cx="${x}" cy="${y}" r="2"/><path class="iso-detail" d="M${x-1} ${y}h2"/>`;
  return svg+'</g>';
}
export function propellers() {
  let svg='';
  for (const [x,y] of rotors) {
    svg+=`<g transform="${top(x,y,67)}" class="iso-rotor"><circle class="iso-guide" r="49"/><path class="iso-blade" d="M-6 0C-20-10-49-8-50-3C-48 3-23 8-4 4L6 0C20 10 49 8 50 3C48-3 23-8 4-4Z"/><circle class="iso-metal" r="6"/><circle class="iso-fastener" r="2"/></g>`;
  }
  return svg;
}
export function signals() {
  let svg='';
  for (const [x,y] of rotors) {
    const a=project([138,138,58]), b=project([x,y,58]);
    svg+=`<path class="iso-wire" d="M${a.join(' ')}L${b.join(' ')}"/><circle class="iso-indicator" cx="${b[0]}" cy="${b[1]}" r="3"/>`;
  }
  const centre=project([138,138,58]);
  return svg+`<circle class="iso-indicator" cx="${centre[0]}" cy="${centre[1]}" r="5"/>`;
}
