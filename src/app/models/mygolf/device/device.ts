export interface Device {
    deviceId?: string;
    deviceName?: string;
    virtual?: boolean;
    cordovaVersion?: string;
    platform?: string;
    platformVersion?: string;
    model?: string;
    manufacturer?: string;
    serial?: string;
    userTags?: string;
    ownedBy?:number;
    batterLevel?: number;
    lastActive?: Date;
    /**
     * This is volatile attribute used for maintaining the selection of the item
     */
    selected?: boolean;
    dirty?: boolean;
    assigned?: boolean;
}