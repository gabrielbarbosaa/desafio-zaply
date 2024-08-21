import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({example: 'Borracha Escolar Faber Castell Super Soft'})
    name: string;
    
    @ApiProperty({example: 5.39})
    price: number;
    
    @ApiProperty({example: 'Imagem do produto'})
    image: string;
    
    @ApiProperty({example: 'Faber Castell'})
    brand: string;
    
    @ApiProperty({example: 'Bazar E Utilidades'})
    categories: string;
}
