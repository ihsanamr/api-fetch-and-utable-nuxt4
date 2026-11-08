<script setup lang="ts">
useHead({ title: "Users" });

const route = useRoute();
const router = useRouter();

const searchInput = ref(String(route.query.q ?? ""));
const debouncedSearch = ref(String(route.query.q ?? ""));
const page = ref(Number(route.query.page) || 1);
const sorting = ref<{ id: string; desc: boolean }[]>([]);
const limit = 10;

const initialSort = String(route.query.sort ?? "");
if (initialSort) {
  sorting.value = [{ id: initialSort, desc: route.query.order === "desc" }];
}

const skip = computed(() => (page.value - 1) * limit);
const sortBy = computed(() => sorting.value[0]?.id);
const order = computed(() => {
  if (!sorting.value[0]) return undefined;
  return sorting.value[0].desc ? "desc" : "asc";
});

const { data, status } = await useFetch("/api/users", {
  query: { q: debouncedSearch, limit, skip, sortBy, order },
});

let timer: ReturnType<typeof setTimeout>;

watch(searchInput, (newValue) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    debouncedSearch.value = newValue;
    page.value = 1;
  }, 400);
});

watch([debouncedSearch, page], () => {
  router.replace({
    query: {
      ...route.query,
      q: debouncedSearch.value || undefined,
      page: page.value > 1 ? page.value : undefined,
    },
  });
});

watch(
  sorting,
  (val) => {
    router.replace({
      query: {
        ...route.query,
        sort: val[0]?.id ?? undefined,
        order: val[0] ? (val[0].desc ? "desc" : "asc") : undefined,
      },
    });
  },
  { deep: true },
);

const columns = [
  sortableColumn("id", "ID", "w-20"),
  sortableColumn("fullName", "Name", "w-64"),
  sortableColumn("email", "Email", "w-80"),
  sortableColumn("age", "Age", "w-24"),
];
</script>

<template>
  <div class="min-h-screen bg-linear-to-b from-muted/40 to-default">
    <UContainer class="py-10 space-y-6">
      <!-- Header -->
      <div
        class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex size-11 items-center justify-center rounded-xl bg-primary/10"
          >
            <UIcon name="i-lucide-users" class="size-6 text-primary" />
          </div>
          <div>
            <h1 class="text-2xl font-bold tracking-tight">Users</h1>
            <p class="text-sm text-muted">Cari dan telusuri data pengguna</p>
          </div>
        </div>

        <UBadge color="neutral" variant="subtle" size="lg" class="w-fit">
          {{ data?.total }} hasil
        </UBadge>
      </div>

      <!-- Search + Table card -->
      <UCard :ui="{ body: 'space-y-4' }">
        <template #header>
          <div class="flex items-center justify-between gap-4">
            <UInput
              v-model="searchInput"
              icon="i-lucide-search"
              placeholder="Cari nama, email..."
              size="lg"
              class="w-full max-w-sm"
              :loading="status === 'pending'"
            />
            <UIcon
              v-if="status === 'pending'"
              name="i-lucide-loader-circle"
              class="size-5 animate-spin text-muted"
            />
          </div>
        </template>

        <UTable
          v-model:sorting="sorting"
          :sorting-options="{ manualSorting: true }"
          :data="data?.users || []"
          :columns="columns"
          :loading="status === 'pending'"
          :ui="{
            base: 'table-fixed',
            th: 'border-r border-default last:border-r-0',
            td: 'border-r border-default last:border-r-0',
            tr: 'hover:bg-muted/50 first:hover:bg-transparent',
          }"
          class="rounded-lg"
        >
          <template #age-cell="{ row }">
            <UBadge color="primary" variant="subtle"
              >{{ row.original.age }} th</UBadge
            >
          </template>

          <template #empty>
            <div class="flex flex-col items-center gap-2 py-10 text-muted">
              <UIcon name="i-lucide-search-x" class="size-8" />
              <p class="text-sm">
                Tidak ada pengguna yang cocok dengan pencarian.
              </p>
            </div>
          </template>
        </UTable>

        <div class="flex min-h-10 items-center justify-center pt-2">
          <UPagination
            v-model:page="page"
            :total="data?.total ?? 0"
            :items-per-page="limit"
          />
        </div>
      </UCard>
    </UContainer>
  </div>
</template>
