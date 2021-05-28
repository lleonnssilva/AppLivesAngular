import { SafeResourceUrl } from '@angular/platform-browser';

export class Live {
    constructor( 
        public id: string,
        public liveName: string,
        public channelName: string,
        public liveDate: string,
        public liveTime: string,
        public liveLink: string,
        public registrationDate: string,
        public urlSafe: SafeResourceUrl,
        public statusLive: boolean
        ){
       
    }
   
}
