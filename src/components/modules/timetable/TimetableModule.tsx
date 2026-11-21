import React, { useState } from 'react';
import { Clock, Plus, Filter, Calendar, Building, BookOpen, Trash2 } from 'lucide-react';
import { useStore } from '../../../lib/store';
import { TimetableSlot } from '../../../types';
import { Modal } from '../../common/Modal';

export const TimetableModule: React.FC = () => {
  const store = useStore();
  const currentUser = store.currentUser;
  const isStudent = currentUser?.role === 'student';

  const [selectedClassId, setSelectedClassId] = useState(store.classes[0]?.id || '');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);

  // Add slot form
  const [slotForm, setSlotForm] = useState({
    class_id: store.classes[0]?.id || '',
    subject_id: store.subjects[0]?.id || '',
    teacher_id: store.teachers[0]?.id || '',
    day_of_week: 'Monday' as any,
    period_number: 1,
    start_time: '08:30 AM',
    end_time: '09:15 AM',
    room_no: 'Room 101',
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Current filtered slots
  const filteredSlots = store.timetable.filter(
    (t) => t.class_id === selectedClassId && t.day_of_week === selectedDay
  );
  filteredSlots.sort((a, b) => a.period_number - b.period_number);

  const handleSaveSlot = (e: React.FormEvent) => {
    e.preventDefault();
    store.addTimetableSlot(slotForm);
    setIsAddSlotOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-600" />
            <span>Weekly Class Timetable & Schedule Matrix</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Weekly lecture schedules, period distribution, faculty assignments, and lab allocations
          </p>
        </div>

        {!isStudent && (
          <button
            onClick={() => {
              setSlotForm({
                ...slotForm,
                class_id: selectedClassId,
                day_of_week: selectedDay,
                period_number: filteredSlots.length + 1,
              });
              setIsAddSlotOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Lecture Slot</span>
          </button>
        )}
      </div>

      {/* Selectors Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-500 uppercase">Class Section:</label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
          >
            {store.classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name} ({cls.group_name})
              </option>
            ))}
          </select>
        </div>

        {/* Days Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDay === day
                  ? 'bg-blue-950 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Timetable Period Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSlots.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            No scheduled lectures configured for {selectedDay}. Click "Add Lecture Slot" to assign a period.
          </div>
        ) : (
          filteredSlots.map((slot) => {
            const subject = store.subjects.find((s) => s.id === slot.subject_id);
            const teacher = store.teachers.find((t) => t.id === slot.teacher_id);
            return (
              <div
                key={slot.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-800 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 font-bold flex items-center justify-center text-xs">
                      P-{slot.period_number}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">
                      {slot.start_time} - {slot.end_time}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {subject?.name || 'Subject'}
                  </h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                    {teacher?.full_name || 'Assigned Professor'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium">{slot.room_no}</span>
                  </div>

                  {!isStudent && (
                    <button
                      onClick={() => store.deleteTimetableSlot(slot.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-red-600 transition-colors"
                      title="Remove Slot"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Slot Modal */}
      <Modal
        isOpen={isAddSlotOpen}
        onClose={() => setIsAddSlotOpen(false)}
        title={`Add Lecture Slot for ${selectedDay}`}
        maxWidth="md"
      >
        <form onSubmit={handleSaveSlot} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject *</label>
            <select
              value={slotForm.subject_id}
              onChange={(e) => setSlotForm({ ...slotForm, subject_id: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
            >
              {store.subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Faculty Teacher *</label>
            <select
              value={slotForm.teacher_id}
              onChange={(e) => setSlotForm({ ...slotForm, teacher_id: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
            >
              {store.teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.full_name} ({t.qualification})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Period Number</label>
              <input
                type="number"
                min={1}
                max={8}
                value={slotForm.period_number}
                onChange={(e) => setSlotForm({ ...slotForm, period_number: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Room / Lab</label>
              <input
                type="text"
                value={slotForm.room_no}
                onChange={(e) => setSlotForm({ ...slotForm, room_no: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Start Time</label>
              <input
                type="text"
                value={slotForm.start_time}
                onChange={(e) => setSlotForm({ ...slotForm, start_time: e.target.value })}
                placeholder="08:30 AM"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">End Time</label>
              <input
                type="text"
                value={slotForm.end_time}
                onChange={(e) => setSlotForm({ ...slotForm, end_time: e.target.value })}
                placeholder="09:15 AM"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddSlotOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold"
            >
              Save Slot
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

