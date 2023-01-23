import PostModel from "../models/Post.js"

export const getAll = async(req,res)=> {
    try {
        const posts = await PostModel.find().populate("user").exec();
        res.json(posts)
    } catch (error) {
        console.log(error);
            res.status(500).json({
                message: "Не удалось создать статьи"
            })
    }
}

export const getLastTags = async (req,res)=> {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts.map(obj => obj.tags.slice(0,5))

        const tags_filter = tags.filter((el)=> {
          return (el.length != 0)
        }).flat()

        res.json(tags_filter)
    } catch (error) {
        console.log(error);
            res.status(500).json({
                message: "Не удалось создать статьи"
            })
    }
}

export const getOne = async(req,res)=> {
    try {
        const postId = req.params.id;
        
        PostModel.findOneAndUpdate({
                _id:postId
        },{
            $inc: { viewsCount : 1}
        },{
            returnDocument: "after"
        },
            (err,doc)=> {
                if(err){
                    console.log(error);
                   return res.status(500).json({
                        message: "Не удалось вернуть статью"
                    })
                }
                 
                if(!doc){
                    return res.status(404).json({
                        message: "Статья не найдена"
                    })
                }

                res.json(doc)
            }
        ).populate("user")

    } catch (error) {
        console.log(error);
            res.status(500).json({
                message: "Не удалось создать статью"
            })
    }
}

export const remove = async(req,res)=> {
    try {
        const postId = req.params.id;
       
        PostModel.findOneAndDelete({
            _id:postId
        }, (err,doc)=>{
            if(err){
                console.log(error);
                   return res.status(500).json({
                        message: "Не удалось удалить статью"
                    })
            }

            if(!doc){
                return res.status(404).json({
                    message: "Статья не найдена"
                })
            }

            res.json({
                success: true
            })
        })

    } catch (error) {
        console.log(error);
            res.status(500).json({
                message: "Не удалось создать статью"
            })
    }
}

export const create = async (req,res)=> {
        try {
            const doc = new PostModel({
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags.split(","),
                user: req.userId
            });

            const post = await doc.save();

            res.json(post)

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Не удалось создать статью"
            })
        }
}

export const update = async (req,res)=> {
     try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id:postId
        },{
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags
        })

        res.json({
            success:true
        })
     } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось обновить статью"
        })
     }
}