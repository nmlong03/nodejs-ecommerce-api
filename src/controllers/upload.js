import cloudinary from "../config/cloudinary";

export const uploadImage = async (res, req) => {
    // const files = req.files;
    // console.log(req.files);
    // const uploadPromises = files.map((file) => {
    //     // Sử dụng Cloudinary API để upload file lên Cloudinary
    //     return cloudinary.uploader.upload(file.path);
    // });
    // console.log('uploadPromises', uploadPromises);
    // const results = await Promise.all(uploadPromises);
    // // Trả về kết quả là một mảng các đối tượng chứa thông tin của các file đã upload lên Cloudinary
    // const uploadedFiles = results.map((result) => ({
    //     url: result.secure_url,
    //     publicId: result.public_id,
    // }));
    // return res.json({ urls: uploadedFiles });
}