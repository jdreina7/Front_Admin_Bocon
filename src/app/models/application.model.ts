export class Application {
    constructor(
        public apply_code: number,
        public apply_name: string,
        public apply_amount: number,
        public apply_fee: string,
        public apply_item: string,
        public apply_type: string,
        public apply_date: string,
        public apply_created_by: string,
        public apply_admin_proccess: string,
        public apply_client_proccess: string,
        public apply_total: number,
        public apply_state: boolean,
        public _id?: string
    ) {}
}
