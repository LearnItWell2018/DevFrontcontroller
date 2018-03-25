export class UserProfile{
    public userName:string;   
    public gender:string;
    public userImagePath:string;
    public userNickName:string;
   
    constructor(imagePath:string,gender:string,userFullName:string,userNickName:string){
        this.userName=userFullName;
        this.gender=gender;
        this.userImagePath=imagePath;
        this.userNickName=userNickName;
    }

}