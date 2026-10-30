const {Schema,model,Types}=require('mongoose');
const User=model('User',new Schema({name:String,email:{type:String,unique:true,lowercase:true},passwordHash:String,city:String},{timestamps:true}));
const Tenancy=model('Tenancy',new Schema({userId:{type:Types.ObjectId,ref:'User',index:true},title:String,address:String,landlordName:String,landlordPhone:String,depositAmount:Number,startDate:Date,endDate:Date,
 status:{type:String,enum:['active','moved_out','settled'],default:'active'},spots:[{key:String,label:String}],shareToken:{type:String,unique:true}},{timestamps:true}));
const Inspection=model('Inspection',new Schema({tenancyId:{type:Types.ObjectId,index:true},type:{type:String,enum:['move_in','periodic','move_out']},status:{type:String,enum:['draft','sealed'],default:'draft'},sealedAt:Date,rootHash:String},{timestamps:true}));
const Evidence=model('Evidence',new Schema({inspectionId:{type:Types.ObjectId,index:true},tenancyId:{type:Types.ObjectId,index:true},spotKey:String,imageUrl:String,sha256:{type:String,index:true},prevHash:String,chainHash:String,
 capturedAt:Date,receivedAt:{type:Date,default:Date.now},severity:{type:String,enum:['ok','minor','damage'],default:'ok'},note:String,geo:{lat:Number,lng:Number,acc:Number}}));
const Ack=model('Acknowledgement',new Schema({inspectionId:Types.ObjectId,landlordName:String,comment:String,ip:String,at:{type:Date,default:Date.now}}));
const Claim=model('Claim',new Schema({tenancyId:{type:Types.ObjectId,index:true},items:[{spotKey:String,beforeId:Types.ObjectId,afterId:Types.ObjectId,status:String,deductionAmount:Number,note:String}],letterText:String},{timestamps:true}));
module.exports={User,Tenancy,Inspection,Evidence,Ack,Claim};
