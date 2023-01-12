export class Product {
  id!: string | null;
  name!: string | null;
  description!: string | null;
  price!: number | null;
  image!: string | null;
  category_id!:
    | 'discount'
    | 'sportswear'
    | 'weightlifting'
    | 'cardio'
    | 'bodyweight';
}
