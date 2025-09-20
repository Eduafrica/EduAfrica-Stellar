import React, { useState } from 'react';
import PageLayout from '../PageLayout';
import YourLearningPatner from '../../Component/YourLearningPatner';
import useUserStore from '../../store/userStore';
import { newCourse, uploadCourseImage } from '../../Helpers/api';
import { notify } from '../../Utils/toast';
import { useNavigate } from 'react-router';
import LoadingPage from '../../Component/Helpers/LoadingPage';

function NewCourse() {
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    title: '',
    about: '',
    description: '',
    price: '',
    categories: [],
  });
  const [categoryInput, setCategoryInput] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /**IMAGE */
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      notify('error', 'Please select an image');
      return;
    }

    setLoading(true);
    const res = await uploadCourseImage(selectedFile);
    setLoading(false);

    if (res.success) {
      notify('success', 'Image uploaded successfully');
      // add image url to formData
      setFormData({ ...formData, image: res.data });
    } else {
      notify('error', res.message || 'Failed to upload image');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'categories') {
      setCategoryInput(value);
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleCategoryKeyDown = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const newCat = categoryInput.trim();
      if (newCat && !formData.categories.includes(newCat)) {
        setFormData({
          ...formData,
          categories: [...formData.categories, newCat],
        });
      }
      setCategoryInput('');
    }
  };

  const removeCategory = (cat) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((c) => c !== cat),
    });
  };

  const handleSubmitNewCourse = async () => {
    if (!formData?.title) return notify('error', 'Provide a course title');
    if (!formData?.description)
      return notify('error', 'Provide a course description');
    if (!formData?.about) return notify('error', 'Provide about course');
    if (!formData?.image) return notify('error', 'Provide a course image');
    if (!formData?.price) return notify('error', 'Provide a course price');

    try {
      setLoading(true);
      const res = await newCourse(formData);

      if (res.success) {
        notify('success', res.message);
        setTimeout(() => {
          navigate('/instructor-courses');
        }, 3000);
      } else {
        notify('error', res.message || 'Unable to create new course');
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="z-[200] relative">{loading && <LoadingPage />}</div>
      <div className="bg-cream padx min-h-screen">
        <div className="py-8 md:py-[4rem]">
          <p className="text-[#0F1114] text-xl md:text-2xl lg:text-[32px] font-medium whitespace-nowrap">
            Hello <span className="text-primary">{user?.name}</span>, Add a new
            Course today
          </p>

          {/* COURSE FORM */}
          <div className="mt-8 flex items-center justify-center">
            <div className="w-full md:w-[500px] rounded-[10px] flex flex-col gap-4 md:gap-2 border-[1px] border-gray-200 p-4 md:p-3">
              <div className="inputGroup">
                <label className="label">Course Title</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div className="inputGroup">
                <label className="label">About Course</label>
                <textarea
                  id="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="input h-[120px] md:h-[200px] resize-none"
                />
              </div>
              <div className="inputGroup">
                <label className="label">Course Description</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input h-[120px] md:h-[200px] resize-none"
                />
              </div>
              <div className="inputGroup">
                <label className="label">Course Price</label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Categories */}
              <div className="inputGroup">
                <label className="label">Categories (press , or Enter)</label>
                <input
                  type="text"
                  id="categories"
                  value={categoryInput}
                  onChange={handleChange}
                  onKeyDown={handleCategoryKeyDown}
                  className="input"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.categories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="bg-primary-100 text-primary px-2 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {cat}
                      <button
                        type="button"
                        className="ml-1 text-red-500"
                        onClick={() => removeCategory(cat)}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/**IMAGE */}
              <div className="inputGroup">
                <label className="label">Course Image</label>
                <input
                  type="file"
                  className="input"
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg"
                />
                <div className="flex items-center justify-end mt-2">
                  <div
                    onClick={handleUploadImage}
                    className="btn w-full md:w-fit text-center"
                  >
                    {loading ? 'Uploading...' : 'Upload'}
                  </div>
                </div>
              </div>

              {/* BTN */}
              <div className="inputGroup mt-6 md:mt-8">
                <div
                  onClick={handleSubmitNewCourse}
                  className="btn w-full text-center"
                >
                  {loading ? 'Uploading...' : 'Upload Course'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* YOUR LEARNING PARTNER */}
      <div className="padx bg-white">
        <div className="py-12 md:py-[96px]">
          <YourLearningPatner />
        </div>
      </div>
    </PageLayout>
  );
}

export default NewCourse;
