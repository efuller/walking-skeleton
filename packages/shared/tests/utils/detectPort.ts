import detect from 'detect-port';

export async function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve, reject) => {
    detect(port)
      .then(_port => {
        if (port == _port) {
          // console.log(`port: ${port} was not occupied`);
          resolve(true);
        } else {
          // console.log(`port: ${port} was occupied, try port: ${_port}`);
          resolve(false);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}