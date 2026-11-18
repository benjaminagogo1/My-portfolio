// Apply validated reading preferences before paint. Only the root data
// attributes vary from server HTML; the React preference store hydrates later.
export const accessibilityScript = `(function(){
  var p={};
  try{p=JSON.parse(localStorage.getItem("benjamin-portfolio-accessibility")||"{}")||{};}catch(e){}
  var r=document.documentElement,t=p.theme==="light"||p.theme==="dark"?p.theme:"system";
  var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);
  r.dataset.theme=d?"dark":"light";r.style.colorScheme=d?"dark":"light";
  r.dataset.textSize=p.largeText===true?"large":"standard";
  r.dataset.contrast=p.highContrast===true?"high":"standard";
  r.dataset.motion=p.reduceMotion===true?"reduced":"system";
})();`;
