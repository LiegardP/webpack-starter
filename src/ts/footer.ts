export class Footer {
    footertext: string;  
    
    constructor() {
        console.log(`Footer is instancied`);
        this.footertext = `Footer class from ts file`;
    } 
        
    getFooterText(): string {
        return this.footertext
    }
}