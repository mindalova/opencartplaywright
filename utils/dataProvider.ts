import path from 'path';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

export class DataProvider {

    static getTestDataFromJson(filePath: string) {
        const fullPath = path.join(process.cwd(), filePath);
        return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
    }

    static getTestDataFromCsv(filePath: string) {
        const fullPath = path.join(process.cwd(), filePath);
        
        console.log('CWD:', process.cwd());
        console.log('CSV fullPath:', fullPath);
        console.log('Exists?', fs.existsSync(fullPath));

        return parse(fs.readFileSync(fullPath), {
            columns: true,
            skip_empty_lines: true
        });
    }
}
