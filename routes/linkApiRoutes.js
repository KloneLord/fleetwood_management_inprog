import express from 'express';
const router = express.Router();

// Utility to filter sub-items by role
const filterSubItemsByRole = (subItems, role) => {
    const allowedSubItems = {
        worker: ['List'],
        manager: ['List', 'Add/Edit'],
        admin: ['List', 'Add/Edit', 'Profile', 'Employees'],
    };
    return subItems.filter(item => allowedSubItems[role].includes(item.name));
};

const linksByRole = {
    worker: [
        { name: 'Dashboard', icon: 'fas fa-tachometer-alt', url: '/dashboard', active: false },
        {
            name: 'Customers',
            icon: 'fas fa-users',
            url: '/customers',
            active: false,
            subItems: [
                { name: 'List', url: '/customers_list.html' },
            ],
        },
        {
            name: 'Jobs',
            icon: 'fas fa-briefcase',
            url: '/jobs',
            active: false,
            subItems: [
                { name: 'List', url: '/jobs_list.html' },
            ],
        },
        {
            name: 'Inventory',
            icon: 'fas fa-box-open',
            url: '/inventory',
            active: false,
            subItems: [
                { name: 'List', url: '/inventory_list.html' },
            ],
        },
        {
            name: 'My Timesheet',
            icon: 'fas fa-clock',
            url: '/my_timesheet.html',
            active: false,
        },
        {
            name: 'Settings',
            icon: 'fas fa-cogs',
            url: '/settings',
            active: false,
            subItems: [
                { name: 'Profile', url: '/settings_profile.html' },
            ],
        },
    ],
    manager: [
        { name: 'Dashboard', icon: 'fas fa-tachometer-alt', url: '/dashboard', active: false },
        {
            name: 'Customers',
            icon: 'fas fa-users',
            url: '/customers',
            active: false,
            subItems: [
                { name: 'List', url: '/customers_list.html' },
                { name: 'Add/Edit', url: '/customers_edit.html' },
            ],
        },
        {
            name: 'Jobs',
            icon: 'fas fa-briefcase',
            url: '/jobs',
            active: false,
            subItems: [
                { name: 'List', url: '/jobs_list.html' },
                { name: 'Add/Edit', url: '/jobs_edit.html' },
            ],
        },
        {
            name: 'Inventory',
            icon: 'fas fa-box-open',
            url: '/inventory',
            active: false,
            subItems: [
                { name: 'List', url: '/inventory_list.html' },
                { name: 'Add/Edit', url: '/inventory_edit.html' },
            ],
        },
        {
            name: 'My Timesheet',
            icon: 'fas fa-clock',
            url: '/my_timesheet.html',
            active: false,
        },
        {
            name: 'Time Sheets',
            icon: 'fas fa-clock',
            url: '/timesheet',
            active: false,
            subItems: [
                { name: 'List', url: '/timesheet_list.html' },
                { name: 'Add/Edit', url: '/timesheet_edit.html' },
            ],
        },
        {
            name: 'Orders',
            icon: 'fas fa-shopping-cart',
            url: '/order',
            active: false,
            subItems: [
                { name: 'List', url: '/order_list.html' },
                { name: 'Add/Edit', url: '/order_edit.html' },
            ],
        },
        {
            name: 'Invoices',
            icon: 'fas fa-file-invoice',
            url: '/invoice',
            active: false,
            subItems: [
                { name: 'List', url: '/invoice_list.html' },
                { name: 'Add/Edit', url: '/invoice_edit.html' },
            ],
        },
        {
            name: 'Settings',
            icon: 'fas fa-cogs',
            url: '/settings',
            active: false,
            subItems: [
                { name: 'Profile', url: '/settings_profile.html' },
                { name: 'Employees', url: '/settings_employees.html' },
                { name: 'Complaints', url: '/settings_user_complaints.html' },
                { name: 'Archived Lists', url: '/settings_archived.html' },
                { name: 'Archived Lists', url: '/settings_suppliers.html' },

            ],
        },
    ],
    admin: [
        { name: 'Dashboard', icon: 'fas fa-tachometer-alt', url: '/dashboard', active: false },
        {
            name: 'Templates',
            icon: 'fas fa-box-open',
            url: '/templates',
            active: false,
            subItems: [
                { name: 'Template', url: '/temp.html' },
                { name: 'Add', url: '/temp_add.html' },
                { name: 'List', url: '/temp_list.html' },
                { name: 'Edit', url: '/temp_edit.html' },
                { name: 'test', url: '/test.html' },
            ],
        },
        {
            name: 'Customers',
            icon: 'fas fa-users',
            url: '/customers',
            active: false,
            subItems: [
                { name: 'List', url: '/customer_list.html' },
                { name: 'Add', url: '/customer_add.html' },
            ],
        },
        {
            name: 'Jobs',
            icon: 'fas fa-briefcase',
            url: '/jobs',
            active: false,
            subItems: [
                { name: 'List', url: '/jobs_list.html' },
                { name: 'Create a Job', url: '/job_create.html' },
            ],
        },
        {
            name: 'Inventory',
            icon: 'fas fa-box-open',
            url: '/inventory',
            active: false,
            subItems: [
                { name: 'List', url: '/inventory_list.html' },
                { name: 'Add', url: '/inventory_add.html' },
            ],
        },
        {
            name: 'My Timesheet',
            icon: 'fas fa-clock',
            url: '/my_timesheet.html',
            active: false,
        },
        {
            name: 'Time Sheets',
            icon: 'fas fa-clock',
            url: '/timesheet',
            active: false,
            subItems: [
                { name: 'List', url: '/timesheet_list.html' },
                { name: 'Add/Edit', url: '/timesheet_edit.html' },
            ],
        },
        {
            name: 'Orders',
            icon: 'fas fa-shopping-cart',
            url: '/order',
            active: false,
            subItems: [
                { name: 'List', url: '/order_list.html' },
                { name: 'Add/Edit', url: '/order_edit.html' },
            ],
        },
        {
            name: 'Invoices',
            icon: 'fas fa-file-invoice',
            url: '/invoice',
            active: false,
            subItems: [
                { name: 'List', url: '/invoice_list.html' },
                { name: 'Add/Edit', url: '/invoice_edit.html' },
            ],
        },
        {
            name: 'Settings',
            icon: 'fas fa-cogs',
            url: '/settings',
            active: false,
            subItems: [
                { name: 'Profile', url: '/settings_profile.html' },
                { name: 'Employees', url: '/settings_employees.html' },
                { name: 'Reports', url: '/settings_reports.html' },
                { name: 'Mark Ups', url: '/settings_markups.html' },
                { name: 'Suppliers', url: '/settings_suppliers.html' },
                { name: 'Inventory Categories', url: '/settings_item_category.html' },
                { name: 'Access Levels', url: '/settings_access_levels.html' },
                { name: 'Complaints', url: '/settings_user_complaints.html' },
                { name: 'Archived Lists', url: '/settings_archived.html' },
            ],
        },
    ],
};

// API endpoint
router.get('/', (req, res) => {
    const userRole = req.session?.user?.role || 'worker'; // Default to worker if no role is found
    const links = linksByRole[userRole] || [];
    res.json(links);
});

export default router;
