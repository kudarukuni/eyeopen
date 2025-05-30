import * as del from 'del';
import { Collection } from 'lokijs';

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
        return cb(new Error('Only PDF Documents Are Allowed!'), false);
    }
    cb(null, true);
};

const loadCollection = function (colName, db: Loki): Promise<Collection<any>> {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(colName) || db.addCollection(colName);
            resolve(_collection);
        })
    });
}
/*
const cleanFolder = function (folderPath) {
    // delete files inside folder but not the folder itself
    del.sync([`${folderPath}/**`, `!${folderPath}`]);
};
*/

export { imageFilter, loadCollection/*, cleanFolder*/}