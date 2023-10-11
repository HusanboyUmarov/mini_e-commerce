import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path'
@Injectable()
export class FilesService {
    async createFile(file:any){
        try {
            
           const fileName = uuid.v4()+path.extname(String(file.originalname));
           const filePath = path.resolve(__dirname, '..', 'static');

           if(!fs.existsSync(filePath))
           {
            fs.mkdirSync(filePath, {recursive:true})
           }

           fs.writeFileSync(path.join(filePath, fileName), file.buffer)
           return fileName
            
        } catch (error) {
            throw new HttpException(
            'Error on writing file',
            HttpStatus.INTERNAL_SERVER_ERROR)
            
        }
    }
}
