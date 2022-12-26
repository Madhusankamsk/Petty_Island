export  const checkImage = (file) =>{
    let err = ""
    if(!file) return err = "File does not exist"

    if(file.size > 1024 * 1024)
        err = "The largest image size is 1Mb"

    if(file.type !== 'image/jpeg' && file.type !== 'image/png')
        err = "The image format is Incorrect"
        
    return err
}

export const imageUpload = async(images) =>{
    let imgArr = [];
    for(const item of images){
        const formData = new FormData()
        formData.append("file",item)
        formData.append("upload_preset","insta_clone")
        formData.append("cloud_name","dc2vbbdu8")

        const res = await fetch("https://api.cloudinary.com/v1_1/dc2vbbdu8/image/upload",{
            method: "post",
            body: formData
          })
        const data = await res.json()
        imgArr.push({public_id: data.public_id , url: data.secure_url})
    }
    return imgArr;
}