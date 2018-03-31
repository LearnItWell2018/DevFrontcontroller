export class CustomerAddress {


    private id:String;

    private pincode:String;

    private street:String;

    private roomorflatno:String;

    private nearestLandMark:String;

    constructor(id:String, pincode:String, street:String, roomorflatno:String, nearestLandMark:String) {
        this.id = id;
        this.nearestLandMark = nearestLandMark;
        this.pincode = pincode;
        this.roomorflatno = roomorflatno;
        this.street = street;
    }


}