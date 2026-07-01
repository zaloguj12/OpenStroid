import { InstallPage } from './InstallPage';

export function LibraryCatalogPage() {
  return (
    <InstallPage
      collectionName="Library"
      title="Library"
      description="Browse Boosteroid library games separately from your installed My Games list."
      emptyTitle="No library games found"
    />
  );
}
