const fileUploadHelper = filePath => {
    const multer = require('multer');
    const path   = require('path');
    const mkdirp = require('mkdirp')
    const storage = multer.diskStorage({
        destination: async(req,file,next) => {
            const uploadPath = path.resolve(filePath);
            try {
                const folderStatus = await ensureFolderExists(uploadPath, 484);
                if(folderStatus) {
                    next(null,uploadPath)
                } else {
                    next(null,'')
                }
            }catch(err){
                console.log(err,'Error')
            }
        },
        filename: async(req,file,next) => {
            next(null,file.originalname);
        },
        onFileUploadStart: file => {
            recentFile = file;
            recentFile.finished = false;
        },
        onFileUploadComplete: file => {
            recentFile.finished = true;
        }
    })
    const ensureFolderExists = async(path, mask) => {
        return new Promise((resolve, reject) => {
         mkdirp(path).then(err => {
            if (err) {
                reject(err); // something else went wrong
            } else {
                resolve(true); // successfully created folder
            }
        })
    });
      };
    return {
        uploader:multer({storage})
    }
}

module.exports = fileUploadHelper;