const antColorsData: {[key: string]: string} = {
  BLACK: '#0f1111',
  RED: '#f72b29',
  SILVER: '#97a5b7',
};


export const mapAntToColor = (color: string) => {
  return antColorsData[color];
};
