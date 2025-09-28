class Helpers {
    static localhost: string = 'localhost:3000';
    static server: string = '46.202.140.156:3000';
    static basePath: string = `https://${this.server}`;
    static apiUrl: string = `${this.basePath}/api/`;
    static secretKey: string = '3434774438';
}

export default Helpers;