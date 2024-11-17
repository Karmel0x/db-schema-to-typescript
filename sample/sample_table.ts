/** table comment 1 */
export type SampleTable = {
    /**
     * UNSIGNED_INT(10)
     * default: auto_increment
     */
    id: number;
    /**
     * column comment 1
     * INT(11)
     * default: null
     */
    sample_column1: number | null;
    /**
     * VARCHAR(255)
     * default: "default value 1"
     */
    sample_column2: string | null;
    /**
     * TINYINT(4)
     * default: null
     */
    tinyint_column_1: number | null;
    /**
     * SMALLINT(6)
     * default: null
     */
    smallint_column_1: number | null;
    /**
     * MEDIUMINT(9)
     * default: null
     */
    mediumint_column_1: number | null;
    /**
     * INT(11)
     * default: null
     */
    int_column_1: number | null;
    /**
     * BIGINT(20)
     * default: null
     */
    bigint_column_1: bigint | null;
    /**
     * DECIMAL(10, 2)
     * default: null
     */
    decimal_column_1: string | null;
    /**
     * DOUBLE
     * default: null
     */
    double_column_1: number | null;
    /**
     * FLOAT
     * default: null
     */
    float_column_1: number | null;
    /**
     * TINYTEXT
     * default: null
     */
    tinytext_column_1: string | null;
    /**
     * MEDIUMTEXT
     * default: null
     */
    mediumtext_column_1: string | null;
    /**
     * TEXT
     * default: null
     */
    text_column_1: string | null;
    /**
     * LONGTEXT
     * default: null
     */
    longtext_column_1: string | null;
    /**
     * CHAR(1)
     * default: null
     */
    char_column_1: string | null;
    /**
     * VARCHAR(255)
     * default: null
     */
    varchar_column_1: string | null;
    /**
     * JSON
     * default: null
     */
    json_column_1: any | null;
    /**
     * DATE
     * default: null
     */
    date_column_1: Date | null;
    /**
     * DATETIME
     * default: CURRENT_TIMESTAMP
     */
    datetime_column_1: Date | null;
    /**
     * TIME
     * default: null
     */
    time_column_1: string | null;
    /**
     * TIMESTAMP
     * default: null
     */
    timestamp_column_1: Date | null;
    /**
     * YEAR
     * default: null
     */
    year_column_1: number | null;
    /**
     * BIT(1)
     * default: null
     */
    bit_column_1: boolean | null;
    /**
     * BINARY(1)
     * default: null
     */
    binary_column_1: Buffer | null;
    /**
     * TINYBLOB
     * default: null
     */
    tinyblob_column_1: Buffer | null;
    /**
     * MEDIUMBLOB
     * default: null
     */
    mediumblob_column_1: Buffer | null;
    /**
     * BLOB
     * default: null
     */
    blob_column_1: Buffer | null;
    /**
     * LONGBLOB
     * default: null
     */
    longblob_column_1: Buffer | null;
    /** POINT */
    point_column_1: object | null;
    /** MULTIPOINT */
    multipoint_column_1: object | null;
    /** LINESTRING */
    linestring_column_1: object | null;
    /** MULTILINESTRING */
    multilinestring_column_1: object | null;
    /** POLYGON */
    polygon_column_1: object | null;
    /** MULTIPOLYGON */
    multipolygon_column_1: object | null;
    /** GEOMETRY */
    geometry_column_1: object | null;
    /** GEOMETRYCOLLECTION */
    geometrycollection_column_1: object | null;
};

