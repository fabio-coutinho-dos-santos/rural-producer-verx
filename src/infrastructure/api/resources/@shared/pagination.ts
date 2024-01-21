import RepositoryInterface from "../../../../domain/@shared/repository/repository.interface";

export default class PaginationMetadata<T> {
  constructor(private readonly repository: RepositoryInterface<T>) {}

  async buildMetadata(page: number, pageSize: number) {
    const totalItems = await this.repository.count();
    const totalPages = Math.ceil(totalItems / pageSize);
    const currentPage = Math.min(page, totalPages);
    const skip = currentPage > 0 ? ((currentPage - 1) * pageSize) : 0;
    const take = pageSize;
    const metadata: PaginationMetadataType = {
      totalItems,
      totalPages,
      currentPage,
      skip,
      take
    };
    return metadata;
  }
}

export type PaginationMetadataType = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  skip: number,
  take: number
};
