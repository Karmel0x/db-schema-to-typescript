import mariadb from 'mariadb';

//INSERT INTO `sample_table` VALUES (1, 2, 'default value 1', 3, 4, 5, 6, 7, 8.00, 9, 10, 'a', 'b', 'c', 'd', 'e', 'f', '{}', '2024-01-02', '2024-01-02 11:12:13', 2024, '11:12:13', '2024-01-02 11:12:13', b'1', 0x55, NULL, NULL, 0x0155, NULL, ST_GeomFromText('POINT(10 10)'), NULL, NULL, NULL, NULL, NULL, NULL, NULL);

async function main() {
    const pool = mariadb.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'testing',
        connectionLimit: 5,
    });

    const rows = await pool.query('SELECT * FROM sample_table');
    const row = rows[0];

    for (const key in row) {
        const col = row[key];
        console.log(`${key} : ${typeof col} : ${col?.constructor?.name} :: ${col}`);
    }

    pool.end();
}

main();
