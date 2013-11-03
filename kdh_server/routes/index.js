var util = require('util')
    , fs = require('fs');

/*
 * POST image upload
 */
exports.upload = function(req, res){
	console.log('Upload was called!');
	var images = [];
	var image = req.files.uploadedfile;
	var kb = image.size / 1024 | 0;

	images.push({ name: image.name, size: kb });
	renameImg(image);

	res.send( { title: 'success', msg: 'Image Upload Done' });
};

function renameImg(image){
    var tmp_path = image.path;
	var file_name_array = image.name.split('/');
    var target_path = '/home/godong/kdh/kdh_server/public/upload/' + file_name_array[5];
    console.log('Target_path: ' + target_path );
            
    fs.rename(tmp_path, target_path, function(err){
        if(err) throw err;
        console.log('Upload done');
    });
}