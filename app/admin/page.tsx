'use client';

import { useState, useCallback, useEffect } from 'react';
import { Upload, Plus, Trash2, Save, Image as ImageIcon, Crop, X, Mail } from 'lucide-react';
import Cropper from 'react-easy-crop';

// Type definitions for react-easy-crop
type Point = { x: number; y: number };
type Area = { x: number; y: number; width: number; height: number };

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Simple password check (you can change this)
  const ADMIN_PASSWORD = 'kaleab2024';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background-dark px-4">
        <div className="card-surface rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8 gradient-text">
            Portfolio Admin
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 card-surface rounded-xl focus:ring-2 focus:ring-accent-primary focus:border-transparent transition-smooth outline-none"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-smooth"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
            Default password: kaleab2024
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Portfolio Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your portfolio content</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {['profile', 'experience', 'projects', 'techstack', 'messages'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold capitalize transition-smooth whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg'
                  : 'card-surface hover:border-accent-primary'
              }`}
            >
              {tab === 'techstack' ? 'Tech Stack' : tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="card-surface rounded-2xl p-8">
          {activeTab === 'profile' && <ProfileSection />}
          {activeTab === 'experience' && <ExperienceSection />}
          {activeTab === 'projects' && <ProjectsSection />}
          {activeTab === 'techstack' && <TechStackSection />}
          {activeTab === 'messages' && <MessagesSection />}
        </div>
      </div>
    </div>
  );
}

function ProfileSection() {
  const [profileData, setProfileData] = useState({
    image: '/profile.svg',
    name: 'Kaleab Temesgen',
    title: 'Full-Stack Engineer & Data Science Enthusiast',
    description: 'Engineer Intern at Space Science and Geospatial Institute (SSGI)...',
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (imageSrc: string, pixelCrop: Area): Promise<string> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        const fileUrl = URL.createObjectURL(blob);
        resolve(fileUrl);
      }, 'image/jpeg');
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropSave = async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        
        // Convert blob URL to actual blob
        const response = await fetch(croppedImage);
        const blob = await response.blob();
        
        // Create FormData and upload
        const formData = new FormData();
        formData.append('file', blob, 'profile.jpg');
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const result = await uploadResponse.json();
        
        if (result.success) {
          // Force image reload by adding timestamp
          const timestamp = new Date().getTime();
          setProfileData({ ...profileData, image: `/profile.jpg?t=${timestamp}` });
          setShowCropModal(false);
          setImageSrc(null);
          alert('✅ Profile picture uploaded successfully! Refresh the main page to see it.');
        } else {
          alert('❌ Upload failed: ' + result.error);
        }
      } catch (e) {
        console.error(e);
        alert('❌ Error uploading image');
      }
    }
  };

  const handleSave = () => {
    console.log('Profile data to save:', profileData);
    alert('Profile data logged to console. To persist changes, update the Hero.tsx component in /components folder.');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Picture & Info</h2>
      
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Profile Picture
        </label>
        <div className="flex items-center gap-4">
          <img 
            src={profileData.image} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-4 border-accent-primary"
            onError={(e) => {
              e.currentTarget.src = '/profile.svg';
            }}
          />
          <label className="cursor-pointer px-4 py-2 card-surface rounded-lg hover:border-accent-primary transition-smooth flex items-center gap-2">
            <Upload className="w-5 h-5" />
            <span>Upload & Crop Image</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Upload your image, crop it, and it will be automatically saved!
        </p>
      </div>

      {/* Crop Modal */}
      {showCropModal && imageSrc && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Crop Your Image</h3>
              <button
                onClick={() => {
                  setShowCropModal(false);
                  setImageSrc(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-smooth"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="relative w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Zoom: {zoom.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCropSave}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold hover:shadow-xl transition-smooth"
                >
                  <Crop className="w-5 h-5" />
                  Crop & Upload
                </button>
                <button
                  onClick={() => {
                    setShowCropModal(false);
                    setImageSrc(null);
                  }}
                  className="px-6 py-3 card-surface rounded-xl font-semibold hover:border-accent-primary transition-smooth"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Full Name
        </label>
        <input
          type="text"
          value={profileData.name}
          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          className="w-full px-4 py-3 card-surface rounded-xl focus:ring-2 focus:ring-accent-primary outline-none"
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Professional Title
        </label>
        <input
          type="text"
          value={profileData.title}
          onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
          className="w-full px-4 py-3 card-surface rounded-xl focus:ring-2 focus:ring-accent-primary outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          rows={4}
          value={profileData.description}
          onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
          className="w-full px-4 py-3 card-surface rounded-xl focus:ring-2 focus:ring-accent-primary outline-none resize-none"
        />
      </div>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-smooth"
      >
        <Save className="w-5 h-5" />
        Save Profile Changes
      </button>

      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <p className="text-sm text-green-800 dark:text-green-200 mb-3">
          <strong>✨ Automatic Upload - No Manual Steps!</strong>
        </p>
        <ol className="text-sm text-green-800 dark:text-green-200 space-y-2 ml-4 list-decimal">
          <li>Click "Upload & Crop Image" and select your photo</li>
          <li>Adjust the crop and zoom</li>
          <li>Click "Crop & Upload" - Done! ✅</li>
          <li>Refresh the main page to see your new photo instantly!</li>
        </ol>
      </div>
    </div>
  );
}

function ExperienceSection() {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      period: 'June 2026 - Present',
      title: 'Engineer Intern',
      company: 'Space Science and Geospatial Institute (SSGI)',
      location: 'Addis Ababa, Ethiopia',
      description: 'Working on end-to-end deep learning project...',
      technologies: ['PyTorch', 'Python', 'LSTM-GRU', 'Deep Learning'],
    },
  ]);

  const addExperience = () => {
    setExperiences([...experiences, {
      id: Date.now(),
      period: '',
      title: '',
      company: '',
      location: '',
      description: '',
      technologies: [],
    }]);
  };

  const deleteExperience = (id: number) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const handleSave = () => {
    console.log('Experiences to save:', experiences);
    alert('Experience data logged to console. To persist changes, update the Experience.tsx component.');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Experience & Education</h2>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-smooth"
        >
          <Plus className="w-5 h-5" />
          Add New
        </button>
      </div>

      {experiences.map((exp, index) => (
        <div key={exp.id} className="p-6 bg-gray-50 dark:bg-white/5 rounded-xl space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Experience #{index + 1}</h3>
            <button
              onClick={() => deleteExperience(exp.id)}
              className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-smooth"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Period (e.g., June 2026 - Present)"
              value={exp.period}
              onChange={(e) => {
                const updated = [...experiences];
                updated[index].period = e.target.value;
                setExperiences(updated);
              }}
              className="px-4 py-2 card-surface rounded-lg outline-none focus:ring-2 focus:ring-accent-primary"
            />
            <input
              type="text"
              placeholder="Job Title"
              value={exp.title}
              onChange={(e) => {
                const updated = [...experiences];
                updated[index].title = e.target.value;
                setExperiences(updated);
              }}
              className="px-4 py-2 card-surface rounded-lg outline-none focus:ring-2 focus:ring-accent-primary"
            />
            <input
              type="text"
              placeholder="Company/Institution"
              value={exp.company}
              onChange={(e) => {
                const updated = [...experiences];
                updated[index].company = e.target.value;
                setExperiences(updated);
              }}
              className="px-4 py-2 card-surface rounded-lg outline-none focus:ring-2 focus:ring-accent-primary"
            />
            <input
              type="text"
              placeholder="Location"
              value={exp.location}
              onChange={(e) => {
                const updated = [...experiences];
                updated[index].location = e.target.value;
                setExperiences(updated);
              }}
              className="px-4 py-2 card-surface rounded-lg outline-none focus:ring-2 focus:ring-accent-primary"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Description"
            value={exp.description}
            onChange={(e) => {
              const updated = [...experiences];
              updated[index].description = e.target.value;
              setExperiences(updated);
            }}
            className="w-full px-4 py-2 card-surface rounded-lg outline-none focus:ring-2 focus:ring-accent-primary resize-none"
          />

          <input
            type="text"
            placeholder="Technologies (comma separated)"
            value={exp.technologies.join(', ')}
            onChange={(e) => {
              const updated = [...experiences];
              updated[index].technologies = e.target.value.split(',').map(t => t.trim());
              setExperiences(updated);
            }}
            className="w-full px-4 py-2 card-surface rounded-lg outline-none focus:ring-2 focus:ring-accent-primary"
          />
        </div>
      ))}

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-smooth"
      >
        <Save className="w-5 h-5" />
        Save All Experiences
      </button>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> Changes are logged to console. To persist changes, update the Experience.tsx component in /components folder.
        </p>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load projects from API
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.projects) {
          setProjects(data.projects);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading projects:', err);
        setLoading(false);
      });
  }, []);

  const addProject = () => {
    setProjects([...projects, {
      id: Date.now(),
      title: '',
      description: '',
      technologies: [],
      liveUrl: '',
      githubUrl: '',
    }]);
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const handleSave = async () => {
    try {
      // Load current data
      const response = await fetch('/api/portfolio');
      const currentData = await response.json();
      
      // Update projects
      currentData.projects = projects;
      
      // Save to API
      const saveResponse = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentData),
      });
      
      const result = await saveResponse.json();
      if (result.success) {
        alert('✅ Projects saved successfully! Refresh the main page to see changes.');
      } else {
        alert('❌ Failed to save projects.');
      }
    } catch (error) {
      console.error('Error saving projects:', error);
      alert('❌ Error saving projects.');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-smooth"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {projects.map((project, index) => (
        <div key={project.id} className="p-6 bg-gray-50 dark:bg-white/5 rounded-xl space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Project #{index + 1}</h3>
            <button
              onClick={() => deleteProject(project.id)}
              className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-smooth"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <input
            type="text"
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => {
              const updated = [...projects];
              updated[index].title = e.target.value;
              setProjects(updated);
            }}
            className="w-full px-4 py-2 card-surface rounded-lg outline-none focus:ring-2 focus:ring-accent-primary"
          />

          <textarea
            rows={3}
            placeholder="Description"
            value={project.description}
            onChange={(e) => {
              const updated = [...projects];
              updated[index].description = e.target.value;
              setProjects(updated);
            }}
            className="w-full px-4 py-2 card-surface rounded-lg outline-none focus:ring-2 focus:ring-accent-primary resize-none"
          />

          <input
            type="text"
            placeholder="Technologies (comma separated)"
            value={project.technologies.join(', ')}
            onChange={(e) => {
              const updated = [...projects];
              updated[index].technologies = e.target.value.split(',').map(t => t.trim());
              setProjects(updated);
            }}
            className="w-full px-4 py-2 card-surface rounded-lg outline-none focus:ring-2 focus:ring-accent-primary"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="url"
              placeholder="Live Demo URL"
              value={project.liveUrl}
              onChange={(e) => {
                const updated = [...projects];
                updated[index].liveUrl = e.target.value;
                setProjects(updated);
              }}
              className="px-4 py-2 card-surface rounded-lg outline-none focus:ring-2 focus:ring-accent-primary"
            />
            <input
              type="url"
              placeholder="GitHub URL"
              value={project.githubUrl}
              onChange={(e) => {
                const updated = [...projects];
                updated[index].githubUrl = e.target.value;
                setProjects(updated);
              }}
              className="px-4 py-2 card-surface rounded-lg outline-none focus:ring-2 focus:ring-accent-primary"
            />
          </div>
        </div>
      ))}

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-smooth"
      >
        <Save className="w-5 h-5" />
        Save All Projects
      </button>

      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <p className="text-sm text-green-800 dark:text-green-200">
          <strong>✅ Auto-Save Enabled!</strong> Changes are saved to the database. Refresh the main page to see updates immediately!
        </p>
      </div>
    </div>
  );
}


function TechStackSection() {
  const [techCategories, setTechCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load tech stack from API
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.techStack) {
          setTechCategories(data.techStack);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading tech stack:', err);
        setLoading(false);
      });
  }, []);

  const addCategory = () => {
    setTechCategories([...techCategories, {
      id: Date.now(),
      title: '',
      technologies: [],
    }]);
  };

  const deleteCategory = (id: number) => {
    setTechCategories(techCategories.filter(cat => cat.id !== id));
  };

  const updateCategory = (id: number, field: string, value: any) => {
    setTechCategories(techCategories.map(cat => 
      cat.id === id ? { ...cat, [field]: value } : cat
    ));
  };

  const handleSave = async () => {
    try {
      // Load current data
      const response = await fetch('/api/portfolio');
      const currentData = await response.json();
      
      // Update tech stack
      currentData.techStack = techCategories;
      
      // Save to API
      const saveResponse = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentData),
      });
      
      const result = await saveResponse.json();
      if (result.success) {
        alert('✅ Tech Stack saved successfully! Refresh the main page to see changes.');
      } else {
        alert('❌ Failed to save tech stack.');
      }
    } catch (error) {
      console.error('Error saving tech stack:', error);
      alert('❌ Error saving tech stack.');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading tech stack...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tech Stack & Ecosystem</h2>
        <button
          onClick={addCategory}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-smooth"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {techCategories.map((category, index) => (
        <div key={category.id} className="p-6 bg-gray-50 dark:bg-white/5 rounded-xl space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {category.title || `Category #${index + 1}`}
            </h3>
            <button
              onClick={() => deleteCategory(category.id)}
              className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-smooth"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category Title
            </label>
            <input
              type="text"
              placeholder="e.g., Frontend Development, Backend & API, etc."
              value={category.title}
              onChange={(e) => updateCategory(category.id, 'title', e.target.value)}
              className="w-full px-4 py-2 card-surface rounded-lg outline-none focus:ring-2 focus:ring-accent-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Technologies (comma separated)
            </label>
            <textarea
              rows={3}
              placeholder="React, TypeScript, Next.js, Tailwind CSS, etc."
              value={category.technologies.join(', ')}
              onChange={(e) => updateCategory(category.id, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
              className="w-full px-4 py-2 card-surface rounded-lg outline-none focus:ring-2 focus:ring-accent-primary resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {category.technologies.map((tech: string, techIndex: number) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-xs font-medium rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-smooth"
      >
        <Save className="w-5 h-5" />
        Save Tech Stack
      </button>

      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <p className="text-sm text-green-800 dark:text-green-200">
          <strong>✅ Auto-Save Enabled!</strong> Changes are saved to the database. Refresh the main page to see updates immediately!
        </p>
      </div>
    </div>
  );
}


function MessagesSection() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    try {
      const data = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
      setLoading(false);
    }
  };

  const deleteMessage = (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      const data = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      const updatedMessages = data.filter((msg: any) => msg.id !== id);
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
      setMessages(updatedMessages);
      alert('✅ Message deleted successfully!');
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('❌ Error deleting message.');
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div className="text-center py-8">Loading messages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Messages</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {messages.length} message{messages.length !== 1 ? 's' : ''} received
          </p>
        </div>
        <button
          onClick={loadMessages}
          className="px-4 py-2 card-surface rounded-lg font-semibold hover:border-accent-primary transition-smooth"
        >
          Refresh
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 card-surface rounded-xl">
          <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">No messages yet</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            Messages from your contact form will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="p-6 bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl hover:border-accent-primary transition-smooth"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {message.name}
                    </h3>
                    <span className="px-2 py-1 bg-accent-primary/10 text-accent-primary text-xs font-medium rounded-md">
                      {message.subject}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {message.email}
                    </span>
                    <span>{formatDate(message.timestamp)}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteMessage(message.id)}
                  className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-smooth"
                  title="Delete message"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <a
                  href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}
                  className="px-4 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-lg font-semibold hover:shadow-lg transition-smooth text-sm"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>📧 How it works:</strong> When someone fills out the contact form on your website, their message is saved here. You can view all messages and reply directly via email!
        </p>
      </div>
    </div>
  );
}
