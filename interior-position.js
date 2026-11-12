((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.InteriorPosition=api})(typeof window==='undefined'?globalThis:window,()=>{
 function placeHotspot({width,height,imageWidth,imageHeight,positionX,pointX,pointY,buttonWidth,dotOffset}){
  const scale=Math.max(width/imageWidth,height/imageHeight),sw=imageWidth*scale,sh=imageHeight*scale;
  const x=(width-sw)*positionX+sw*pointX,y=(height-sh)*.5+sh*pointY;
  return {left:Math.max(8,Math.min(Math.max(8,width-buttonWidth-8),x-dotOffset)),top:Math.max(130,Math.min(height-55,y))};
 }
 return {placeHotspot};
});
