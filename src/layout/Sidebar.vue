<template>
    <div :class="[isSidebarOpen ? 'w-56' : 'w-20']" class="transition-all duration-300 bg-[#031634] h-screen relative">
        <!-- Toggle Sidebar Button -->
        <div class="absolute top-1/2 transform -translate-y-1 right-[-12px] w-10 h-10 rounded-full bg-white text-[#031634] shadow-md flex items-center justify-center cursor-pointer"
            @click="toggleSidebar">
            <span class="material-icons duration-300" :class="{ '-rotate-180': isSidebarOpen }">
                chevron_right
            </span>
        </div>
        <!-- Sidebar Header -->
        <div class="flex items-center justify-center py-4">
            <img src="/src/assets/logo.png" class="h-10 w-10" />
            <h3 :class="isSidebarOpen ? 'block' : 'hidden'" class="text-white text-[18px] ml-4">AutoMobile</h3>
        </div>
        <!-- Sidebar Content -->
        <nav>
            <ul v-for="section in menuSections" :key="section.title">
                <li v-if="section.title"
                    class="text-white uppercase text-[14px] font-semibold px-8 flex items-center py-4"
                    :class="isSidebarOpen ? 'opacity-100 delay-150' : 'opacity-0 hidden'"
                    @click="section.isOpen = !section.isOpen">
                    {{ section.title }}
                </li>
                <!--Menu Items-->
                <li v-for="item in section.items" :key="item.name">
                    <div class="flex justify-between items-center cursor-pointer px-0 py-2">
                        <!-- Parent Item -->
                        <a :href="getParentHref(item)"
                            class="items-center w-full transition-all duration-300 text-center text-white hover:text-cyan-600"
                            :class="[
                                isSidebarOpen ? 'flex text-[16px] px-8' : 'block text-[10px]',
                                ($route.path === item.path ||
                                    (item.child && item.child.some(child => $route.path === child.path))
                                    ? (
                                        isSidebarOpen
                                            ? (item.child
                                                ? ''
                                                : 'bg-[#065AAE] border-l-4 border-white h-12 px-0 mx-0'
                                            )
                                            : 'bg-[#065AAE] border-l-4 border-white h-14 pt-2 px-0 mx-0'
                                    )
                                    : '')]" @click="handleParentClick(item, $event)">
                            <!-- Icon -->
                            <span class="material-icons transition-transform duration-300 mb-1"
                                :class="isSidebarOpen ? 'w-5 h-5 mr-3' : 'w-8 h-5 mx-auto'">{{ item.icon }}</span>

                            <!-- Label -->
                            <span class="transition-all duration-300">
                                {{ item.label }}
                            </span>
                        </a>
                        <!-- Chevron Down for Parent with Children -->
                        <span v-if="isSidebarOpen && item.child"
                            class="material-icons w-10 h-10 transition-transform duration-300 text-white mr-2 p-1"
                            :class="{ 'rotate-180': expandedMenus[item.name] }"
                            @click.stop="toggleExpand(item)">keyboard_arrow_down</span>
                    </div>
                    <!-- Children -->
                    <ul v-if="item.child && expandedMenus[item.name]" class="px-4 text-[14px]"
                        :class="isSidebarOpen ? 'opacity-100 delay-150' : 'opacity-0 hidden'">
                        <li v-for="child in item.child" :key="child.name">
                            <a :href="child.path"
                                class="flex items-center p-2 transition-all duration-300 text-md text-white font-light hover:bg-transparent hover:text-cyan-600"
                                :class="{ 'bg-[#065AAE] h-12 px-4 mx-0': $route.path === child.path }"
                                @click="setActive(child.path)">
                                <span class="w-2 h-2 bg-white rounded-full mr-3"></span>
                                {{ child.label }}
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { ref, reactive, provide, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isSidebarOpen = ref(true);
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

provide("sidebar", { isSidebarOpen, toggleSidebar });

const activeItem = ref("Dashboard"); //default
const expandedMenus = reactive({}); // Keeps track of expanded states

const initializeExpandedMenus = () => {
    menuSections.forEach(section => {
        section.items.forEach(item => {
            if (item.child) {
                expandedMenus[item.name] = isSidebarOpen.value;
            }
        });
    });
};

const toggleExpand = (item) => {
    if (item.child) {
        if (isSidebarOpen.value) {
            expandedMenus[item.name] = !expandedMenus[item.name];
        } else {
            setActive(item.child[0].path);
        }
    } else {
        setActive(item.path);
    }
};
const handleParentClick = (item, event) => {
    if (isSidebarOpen.value && item.child) {
        event.preventDefault();
        toggleExpand(item);
    }
};

const getParentHref = (item) => {
    if (!isSidebarOpen.value && item.child) {
        return item.child[0].path;
    }
    return item.path;
};

watch(isSidebarOpen, (newVal) => {
    if (newVal) {
        initializeExpandedMenus();
    } else {
        Object.keys(expandedMenus).forEach(key => {
            expandedMenus[key] = false;
        });
    }
});

const setActive = (path) => {
    activeItem.value = path;
    router.push(path);
};

const checkScreenSize = () => {
    if (window.innerWidth >= 768) {
        isSidebarOpen.value = true;
    } else {
        isSidebarOpen.value = false;
    }
};

onMounted(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    initializeExpandedMenus();
});

const menuSections = [
    {
        title: null,
        items: [{ name: "Dashboard", label: "Dashboard", icon: "dashboard" }],
    },
    {
        title: "OPERATIONS",
        items: [
            {
                name: "Services",
                label: "Services",
                icon: "car_crash",
                child: [
                    {
                        name: "AllServices",
                        label: "All Services",
                        path: "/services/all",
                    },
                    // {
                    //   name: "ServiceVariation",
                    //   label: "Service Variation",
                    //   path: "/services/variation",
                    // },
                ],
            },
            {
                name: "Appointment",
                label: "Appointment",
                icon: "calendar_month",
                child: [
                    {
                        name: "AllAppointments",
                        label: "All Appointments",
                        path: "/appointment/all",
                    },
                ],
            },
        ],
    },
];
</script>