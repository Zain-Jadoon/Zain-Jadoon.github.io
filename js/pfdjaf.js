const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.clientWidth;
const height = canvas.clientHeight;

// Basic Functions
function resizeCanvasToDisplaySize(canvas, width, height) {
   // If it's resolution does not match change it
   if (canvas.width !== width || canvas.height !== height) {
     canvas.width = width;
     canvas.height = height;
     return true;
   }

   return false;
}
resizeCanvasToDisplaySize(canvas, width, height);
console.log(width);
