# 🔗 GearUp Frontend - API Integration Documentation

This document maps all Next.js Frontend views and components to their respective Express/Prisma Backend API endpoints.

## 🔑 Authentication
| Feature / Action | Next.js Page / Component | HTTP Method | Backend Endpoint |
| :--- | :--- | :--- | :--- |
| User Registration | `app/(auth)/register/page.tsx` | `POST` | `/api/auth/register` |
| User Login | `app/(auth)/login/page.tsx` | `POST` | `/api/auth/login` |
| Fetch Profile | `components/shared/Navbar.tsx` | `GET` | `/api/auth/me` |

## 🎒 Gear Management (Public & Provider)
| Feature / Action | Next.js Page / Component | HTTP Method | Backend Endpoint |
| :--- | :--- | :--- | :--- |
| Browse Gear | `app/(public)/page.tsx` | `GET` | `/api/gear` |
| Filter Categories | `components/gear/GearFilter.tsx` | `GET` | `/api/categories` |
| Gear Details | `app/(public)/gear/[id]/page.tsx` | `GET` | `/api/gear/:id` |
| Add New Gear | `app/dashboard/provider/gear/new/page.tsx` | `POST` | `/api/provider/gear` |
| Update Gear | `components/dashboard/EditGearModal.tsx` | `PUT` | `/api/provider/gear/:id` |
| Delete Gear | `components/dashboard/GearTable.tsx` | `DELETE` | `/api/provider/gear/:id` |

## 📅 Rental Orders & Status Flow
| Feature / Action | Next.js Page / Component | HTTP Method | Backend Endpoint |
| :--- | :--- | :--- | :--- |
| Create Rental Order | `app/(public)/gear/[id]/page.tsx` | `POST` | `/api/rentals` |
| Customer Orders List | `app/dashboard/customer/orders/page.tsx` | `GET` | `/api/rentals` |
| Provider Incoming Orders | `app/dashboard/provider/orders/page.tsx` | `GET` | `/api/provider/orders` |
| Update Order Status | `components/dashboard/OrderStatusButton.tsx` | `PATCH` | `/api/provider/orders/:id` |

## 💳 Payments (Stripe Integration)
| Feature / Action | Next.js Page / Component | HTTP Method | Backend Endpoint |
| :--- | :--- | :--- | :--- |
| Create Payment Intent | `app/dashboard/customer/orders/[id]/pay/page.tsx` | `POST` | `/api/payments/create` |
| Payment Success Callback | `app/payment/success/page.tsx` | `POST` | `/api/payments/confirm` |
| Payment History | `app/dashboard/customer/page.tsx` | `GET` | `/api/payments` |

## 🛡️ Admin Moderation
| Feature / Action | Next.js Page / Component | HTTP Method | Backend Endpoint |
| :--- | :--- | :--- | :--- |
| Get All Users | `app/dashboard/admin/users/page.tsx` | `GET` | `/api/admin/users` |
| Suspend/Activate User | `components/dashboard/UserActionButton.tsx` | `PATCH` | `/api/admin/users/:id` |
| All Gear Listings | `app/dashboard/admin/gear/page.tsx` | `GET` | `/api/admin/gear` |

---

