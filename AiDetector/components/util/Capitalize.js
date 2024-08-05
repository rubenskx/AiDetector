function Capitalize(string){
    let temp = [...string];
    temp[0] = temp[0].toUpperCase();
    return temp.join("")
}
export default Capitalize;