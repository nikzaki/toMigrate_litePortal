
export type ColumnsHidden = {[key:string]:boolean};

export type TableColumnDetails = {
    id: string;
    name: string;
    description?: string;
    hidden?: boolean;
};
export function deriveColumnsHidden(settings: TableColumnDetails[]) {
    let columnsHidden:ColumnsHidden = {};
    settings.forEach(s=>{
        columnsHidden[s.id] = s.hidden;
    });
    return columnsHidden;
};