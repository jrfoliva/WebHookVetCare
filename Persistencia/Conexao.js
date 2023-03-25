import mysql from 'mysql2/promise';

export default async function Conectar() {
    if (global.connection && global.state !== 'disconnected'){
        return global.connection;
    }
    
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "masterkey",
        database: "vetcare"
    });
    console.info('MySql Connected!');
    global.connection = connection;
    return connection;
}