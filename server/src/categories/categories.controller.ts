import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {Category} from './models/category.model';
import {CategoriesService} from './categories.service';
import {CreateCategoryDto} from './dto/create-category.dto';

import {JwtAuthGuard} from '../guards/jwt-auth.guard';
import {FileFieldsInterceptor} from '@nestjs/platform-express';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
    ) {
    }

    // Получение всех категорий, которые добавил определённый пользователь
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllCategories(@Req() request): Promise<Category[]> {
        const userId = request.user.id;
        return this.categoriesService.getAllCategories(userId);
    }

    // Получение одной категории
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getIdCategory(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.getIdCategory(id);
    }

    // Создание категории
    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'imageSrc', maxCount: 1},
    ]))
    createCategory(@Body() dto: CreateCategoryDto, @UploadedFiles() files, @Req() request): Promise<Category> {
        let img = null;
        if (files.imageSrc) {
            const {imageSrc} = files;
            img = imageSrc[0];
        }
        const userId = request.user.id; // получаем id пользователя
        return this.categoriesService.createCategory({...dto, user_id: userId}, img);
    }

    // Обновление категории
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'imageSrc', maxCount: 1},
    ]))
    updateCategory(@Param('id') id: string, @Body() dto: object, @UploadedFiles() files): Promise<Category> {
        // console.log(files);
        let img = null;
        if (files.imageSrc) {
            const {imageSrc} = files;
            img = imageSrc[0];
        }
        return this.categoriesService.updateCategory(id, dto, img);
    }

    // Удаление категории
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    getIdCategoryDelete(@Param('id') id: string): Promise<{ message: string }> {
        return this.categoriesService.getIdCategoryDelete(id);
    }
}
