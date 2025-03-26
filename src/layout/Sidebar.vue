<template>
    <div :class="[isSidebarOpen ? 'sidebar-open' : 'sidebar-closed']">
        <!-- Toggle Sidebar Button -->
        <div class="toggle-button shadow-md" @click="toggleSidebar">
            <span class="material-icons chevron" :class="{ 'rotate-180': isSidebarOpen }">
                chevron_right
            </span>
        </div>
        <!-- Sidebar Header -->
        <div class="sidebar-header">
            <img src="/src/assets/logo.png" :class="[isSidebarOpen ? 'logo-open' : 'logo']" />
            <h3 :class="isSidebarOpen ? 'block' : 'hidden'" class="sidebar-header-title">AutoMobile</h3>
        </div>
        <!-- Sidebar Content -->
        <nav>
            <!--Menu Section Title-->
            <ul v-for="section in menuSections" :key="section.title">
                <li v-if="section.title" class="body-text-sm"
                    :class="isSidebarOpen ? 'menu-section-title-open ' : 'hidden'"
                    @click="section.isOpen = !section.isOpen">
                    {{ section.title }}
                </li>
                <!--Menu Section Items-->
                <li v-for="item in section.items" :key="item.name">
                    <div class="menu-item">
                        <!-- Parent Item -->
                        <a :href="getParentHref(item)" :class="[
                            isSidebarOpen ? 'parent-item-open' : 'parent-item-closed',
                            ($route.path === item.path ||
                                (item.child && item.child.some(child => $route.path === child.path)) ? (
                                isSidebarOpen ? (item.child ? '' : 'active-open') : 'active-closed') : '')]"
                            @click="handleParentClick(item, $event)">

                            <!-- Icon -->
                            <span class="material-icons transition-transform duration-300"
                                :class="isSidebarOpen ? 'w-5 h-5 mr-3' : 'w-8 h-5 mx-auto'">{{ item.icon }}</span>
                            <!-- Label -->
                            <span> {{ item.label }} </span>
                        </a>
                        <!-- Chevron Down for Parent with Children -->
                        <span v-if="isSidebarOpen && item.child" class="material-icons chevron text-white mr-3"
                            :class="{ 'rotate-180': expandedMenus[item.name] }"
                            @click.stop="toggleExpand(item)">keyboard_arrow_down</span>
                    </div>
                    <!-- Children -->
                    <ul v-if="item.child && expandedMenus[item.name]" class="children-menu"
                        :class="isSidebarOpen ? 'opacity-100 delay-150' : 'hidden'">
                        <li v-for="child in item.child" :key="child.name">
                            <a :href="child.path" class="children-item"
                                :class="{ 'active-open': $route.path === child.path }" @click="setActive(child.path)">
                                <!-- Icon -->
                                <span class="bullet"></span>
                                <!-- Label -->
                                <span> {{ child.label }} </span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
import { path } from "framer-motion/client";
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
    console.log(item.child);
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

onMounted(() => {
    initializeExpandedMenus();
});

// menu data
const menuSections = [
    {
        title: null,
        items: [{ name: "Dashboard", label: "Dashboard", icon: "dashboard", path: "/dashboard" }],
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
                        path: "/services/allservices",
                    },
                    {
                        name: "ServiceVariation",
                        label: "Service Variation",
                        path: "/services/serviceattributes",
                    },
                ],
            },
            { name: "Appointments", label: "Appointments", icon: "calendar_month", path: "/appointment/allappointment" },
            { name: "Vehicles", label: "Vehicles", icon: "directions_car", path: "/vehicle/allvehicles" }
        ],
    },
];
</script>