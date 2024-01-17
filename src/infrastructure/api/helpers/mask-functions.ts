export const maskDocument = (document: string) => {
  const regex = /^(\d{3}).*(\d{2})$/;
  let expressionAux: string = '$1';
  for(let i=0; i<document.length-5; i++) {
    expressionAux += '*'
  }
  expressionAux += '$2';
  const result = document.replace(regex, expressionAux);
  return result;
}
