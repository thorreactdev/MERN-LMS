import {Disclosure, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import UserControlledModal from "@/models/UserControlledModal.jsx";
import {useAuth} from "@/context/AuthContext.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";


export default function Header() {
    const {user, handleSignOut} = useAuth();
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    return (<Disclosure as="nav" className="bg-white shadow-xl">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="">
                        <div className="flex flex-shrink-0 items-center">
                            <Link to={"/"} className="">
                            <img
                                alt="Sunshine academy"
                                src="/logo.svg"
                                className="h-8 md:h-10 w-auto"
                            />
                            </Link>
                        </div>
                    </div>
                    {
                        user ? (
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div className="flex gap-2 items-center">
                                        <MenuButton
                                            className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-400">
                                            {/*<span className="absolute -inset-1.5"/>*/}
                                            {/*<span className="sr-only">Open user menu</span>*/}
                                            {user?.avatar && (
                                                <img
                                                    alt="User Avatar"
                                                    src={user?.avatar}
                                                    className="h-9 w-9 rounded-full object-cover"
                                                />
                                                )}
                                            {user && user?.isGoogleLogin && (
                                                <img src="/google.webp" alt="Google User" className="w-4 h-4 absolute bottom-0 right-0 bg-white rounded-full p-[2px]" />
                                            )}
                                        </MenuButton>
                                        <span
                                            className="hidden sm:inline-block font-medium text-black text-sm cursor-pointer">
                                        Welcome, {user && user.username}👍
                                </span>
                                    </div>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-50 mt-2 w-fit origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <p className="font-medium block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 cursor-pointer">@{user?.email}</p>
                                        {user && user?.role === "admin" && (
                                            <MenuItem>
                                                <Link to="/admin-dashboard"
                                                      className="cursor-pointer font-medium block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                                    Admin Dashboard
                                                </Link>
                                            </MenuItem>
                                        )}
                                        {user && user?.role === "user" && (
                                            <MenuItem>
                                                <Link to="/my_courses"
                                                      className="cursor-pointer font-medium block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                                    My Courses
                                                </Link>
                                            </MenuItem>
                                        )}

                                        <MenuItem>
                                            <Link to="/profile_page"
                                                  className="cursor-pointer font-medium block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                                Your Profile
                                            </Link>
                                        </MenuItem>

                                        <MenuItem>
                                            <p
                                                onClick={() => setIsUserModalOpen(true)}
                                                className="cursor-pointer font-medium block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                                                Sign out
                                            </p>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        ) : (
                            <Link to="/login">
                                <Button>
                                    Login To Get Started
                                </Button>
                            </Link>
                        )
                    }


                </div>
            </div>
            {isUserModalOpen && (
                <UserControlledModal
                    onClose={() => setIsUserModalOpen(false)}
                    title={"Sign Out from Account"}
                    description={
                        "By Writing user name in the text box and click on Signout button,you will be signout from your account"
                    }
                    confirmationText={"Sign out"}
                    onConfirm={handleSignOut}/>
            )}
        </Disclosure>
    )
}
