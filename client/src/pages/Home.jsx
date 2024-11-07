import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useUser } from '../contexts/userContext';
import axios from 'axios';

function PatientForm({ patient, onSave, onCancel }) {
    const [formData, setFormData] = useState(patient || {
        fullName: '',
        registeredDateTime: new Date().toISOString().slice(0, 16),
        symptoms: '',
        dob: '',
        gender: '',
        contactNumber: '',
        address: '',
        emergencyContactNumber: '',
        reasonForVisit: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[500px] overflow-y-auto">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="registeredDateTime" className="block text-sm font-medium text-gray-700">Registered Date & Time</label>
                <input
                    type="datetime-local"
                    id="registeredDateTime"
                    name="registeredDateTime"
                    value={formData.registeredDateTime}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700">Symptoms</label>
                <input
                    type="text"
                    id="symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                ></textarea>
            </div>
            <div>
                <label htmlFor="emergencyContactNumber" className="block text-sm font-medium text-gray-700">Emergency Contact Number</label>
                <input
                    type="tel"
                    id="emergencyContactNumber"
                    name="emergencyContactNumber"
                    value={formData.emergencyContactNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="reasonForVisit" className="block text-sm font-medium text-gray-700">Reason for Visit</label>
                <textarea
                    id="reasonForVisit"
                    name="reasonForVisit"
                    value={formData.reasonForVisit}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                ></textarea>
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default function Home() {
    const [patients, setPatients] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);
    const dialogRef = useRef(null);
    const { Username, Role } = useUser();
    // console.log("username and role: ", Username);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                setIsDialogOpen(false);
            }
        }

        if (isDialogOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDialogOpen]);

    const handleAddPatient = () => {
        setEditingPatient(null);
        setIsDialogOpen(true);
    };

    const handleEditPatient = (patient) => {
        setEditingPatient(patient);
        setIsDialogOpen(true);
    };

    const handleDeletePatient = (patientId) => {
        setPatients(patients.filter(p => p.id !== patientId));
    };

    const handleSavePatient = (patientData) => {
        if (editingPatient) {
            setPatients(patients.map(p => p.id === editingPatient.id ? { ...patientData, id: p.id } : p));
        } else {
            const newPatient = {
                ...patientData,
                id: patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1
            };
            setPatients([...patients, newPatient]);
        }
        setIsDialogOpen(false);
    };


    useEffect(() => {
        const fetchAllPatients = async () => {

            axios.get(`${import.meta.env.VITE_BACKEND_URL}/patients`)
                .then((res) => {
                    console.log("res: ", res);
                    setPatients(res.data.patients);
                })
                .catch((error) => console.log("error: ", error))
        }
        fetchAllPatients();
    }, [])

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Patient Management</h1>
                <button
                    onClick={handleAddPatient}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <PlusIcon className="inline-block w-5 h-5 mr-2" />
                    Add Patient
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Full Name</th>
                            <th className="py-2 px-4 border-b">Registered Date & Time</th>
                            <th className="py-2 px-4 border-b">Symptoms</th>
                            <th className="py-2 px-4 border-b">DOB</th>
                            <th className="py-2 px-4 border-b">Gender</th>
                            <th className="py-2 px-4 border-b">Contact Number</th>
                            <th className="py-2 px-4 border-b">Address</th>
                            <th className="py-2 px-4 border-b">Emergency Contact</th>
                            <th className="py-2 px-4 border-b">Reason for Visit</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.ID} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{patient.ID}</td>
                                <td className="py-2 px-4 border-b">{patient.FullName}</td>
                                <td className="py-2 px-4 border-b">{new Date(patient.RegisteredDateTime).toLocaleString()}</td>
                                <td className="py-2 px-4 border-b">{patient.Symptoms}</td>
                                <td className="py-2 px-4 border-b">{patient.Dob}</td>
                                <td className="py-2 px-4 border-b">{patient.Gender}</td>
                                <td className="py-2 px-4 border-b">{patient.ContactNumber}</td>
                                <td className="py-2 px-4 border-b">{patient.Address}</td>
                                <td className="py-2 px-4 border-b">{patient.EmergencyContactNumber}</td>
                                <td className="py-2 px-4 border-b">{patient.ReasonForVisit}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleEditPatient(patient)}
                                        className="text-blue-600 hover:text-blue-800 mr-2"
                                    >
                                        <PencilIcon className="inline-block w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeletePatient(patient.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <TrashIcon className="inline-block w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div ref={dialogRef} className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">{editingPatient ? 'Edit Patient' : 'Add New Patient'}</h2>
                        <PatientForm
                            patient={editingPatient}
                            onSave={handleSavePatient}
                            onCancel={() => setIsDialogOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}