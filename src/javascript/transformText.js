export default function transformText(str) {
  let strArr = str.split("");
  let ixArr = null;
  strArr.forEach((elem, i) => {
    if (elem.toUpperCase() === elem) {
      return (ixArr = i);
    } else return elem;
  });
  if (ixArr) {
    strArr.splice(ixArr, 0, " ");
  }
  strArr[0] = strArr[0].toUpperCase();
  let newStr = strArr.join("");
  return newStr;
}
