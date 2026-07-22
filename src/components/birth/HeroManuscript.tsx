import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { EngravedInput } from '../ui/EngravedInput';
import { EngravedDatePicker } from './EngravedDatePicker';
import { EngravedTimePicker } from './EngravedTimePicker';
import { LocationSearch } from './LocationSearch';
import { MarginGuidance } from './MarginGuidance';
import { RevealKundaliButton } from './RevealKundaliButton';
import { WaxSeal } from '../decorations/WaxSeal';
import { AncientDivider } from '../decorations/AncientDivider';
import { useSound } from '../../context/AudioContext';
import { generateKundali } from '../../services/api';

export const HeroManuscript: React.FC = () => {
  const navigate = useNavigate();
  const { playSound } = useSound();

  const [fullName, setFullName] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [date, setDate] = useState({ day: 15, month: 8, year: 1998 });
  const [time, setTime] = useState<{ hour: number; minute: number; period: 'AM' | 'PM' }>({
    hour: 6,
    minute: 30,
    period: 'AM',
  });
  const [place, setPlace] = useState<string>('Ujjain (उज्जैन)');
  const [error, setError] = useState<string>('');
  const [isRevealing, setIsRevealing] = useState<boolean>(false);

  const handleGenderSelect = (g: 'male' | 'female' | 'other') => {
    playSound('ink-stroke');
    setGender(g);
  };

  const handleReveal = async () => {
    if (!fullName.trim()) {
      setError('Please enter your full name to record in the sacred manuscript.');
      return;
    }
    setError('');
    setIsRevealing(true);

    // Format 24-hour time string
    let h24 = time.hour;
    if (time.period === 'PM' && h24 < 12) h24 += 12;
    if (time.period === 'AM' && h24 === 12) h24 = 0;
    const timeOfBirth = `${h24 < 10 ? '0' + h24 : h24}:${time.minute < 10 ? '0' + time.minute : time.minute}`;
    const dateOfBirth = `${date.year}-${date.month < 10 ? '0' + date.month : date.month}-${date.day < 10 ? '0' + date.day : date.day}`;

    // Clean place string (e.g. "Ujjain (उज्जैन)" -> "Ujjain")
    const cleanCity = place.split(' ')[0] || 'Ujjain';

    // Call Celestial Computation Engine API
    const kundaliResult: any = await generateKundali({
      fullName,
      dateOfBirth,
      timeOfBirth,
      city: cleanCity,
    });

    // Ink spread & golden illumination sequence before transition
    setTimeout(() => {
      navigate('/kundali/view', {
        state: {
          fullName,
          gender,
          date,
          time,
          place,
          planets: kundaliResult?.planets,
          ascendantSign: kundaliResult?.ascendantSign,
          yogas: kundaliResult?.yogas,
        },
      });
    }, 1000);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto my-6">
      {/* Handcrafted Manuscript Shell */}
      <div className="relative p-6 sm:p-10 bg-kc-paper dark:bg-kc-burnt-brown border-2 border-kc-brass shadow-deep rounded-xs overflow-hidden">
        {/* Inner Double Hairline Frame */}
        <div className="pointer-events-none absolute inset-2 border border-kc-gold/40 rounded-2xs" />

        {/* Corner Copper/Brass Engraved Caps */}
        <span className="pointer-events-none absolute top-1.5 left-1.5 h-4 w-4 border-t-2 border-l-2 border-kc-gold" />
        <span className="pointer-events-none absolute top-1.5 right-1.5 h-4 w-4 border-t-2 border-r-2 border-kc-gold" />
        <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-4 w-4 border-b-2 border-l-2 border-kc-gold" />
        <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-4 w-4 border-b-2 border-r-2 border-kc-gold" />

        {/* Manuscript Header */}
        <div className="flex items-center justify-between mb-6 border-b border-kc-brass/30 pb-4">
          <div className="flex items-center gap-3">
            <WaxSeal size="sm" label="ॐ" />
            <div>
              <span className="font-heading text-xs font-bold tracking-widest text-kc-brass dark:text-kc-gold uppercase block">
                Vedic Registry Scroll • I
              </span>
              <span className="font-devanagari text-lg text-kc-maroon dark:text-kc-gold font-semibold">
                जन्मवृत्तान्त पत्रम् (Birth Record)
              </span>
            </div>
          </div>
          <span className="font-serif text-xs italic text-kc-text-muted hidden sm:inline">
            Surya Siddhanta System
          </span>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Full Name */}
          <EngravedInput
            label="Full Name (नाम)"
            placeholder="Enter your full name as inscribed in records..."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            error={error}
            icon="🖋"
          />

          {/* Gender Selector Seals */}
          <div className="flex flex-col gap-1.5">
            <label className="font-heading text-xs font-semibold tracking-wider text-kc-maroon dark:text-kc-gold uppercase">
              Gender Alignment (लिंग)
            </label>
            <div className="flex gap-3">
              {[
                { id: 'male', label: 'Male (पुरुष)' },
                { id: 'female', label: 'Female (स्त्री)' },
                { id: 'other', label: 'Other (अन्य)' },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => handleGenderSelect(g.id as 'male' | 'female' | 'other')}
                  className={`flex-1 py-2 px-3 rounded-xs border font-serif text-xs transition-all cursor-pointer ${
                    gender === g.id
                      ? 'bg-kc-sand border-kc-gold-royal text-kc-maroon font-bold shadow-sm dark:bg-kc-dark-wood dark:text-kc-gold'
                      : 'bg-kc-sand/20 border-kc-brass/30 text-kc-text-secondary hover:border-kc-brass'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time Pickers */}
          <EngravedDatePicker day={date.day} month={date.month} year={date.year} onChange={setDate} />
          <EngravedTimePicker hour={time.hour} minute={time.minute} period={time.period} onChange={setTime} />

          {/* Location Search */}
          <LocationSearch value={place} onChange={(val) => setPlace(val)} />

          {/* Margin Guidance Note */}
          <MarginGuidance />
        </div>

        <AncientDivider symbol="flower" className="my-6" />

        {/* Hero Generate Button */}
        <div className="flex flex-col items-center">
          <RevealKundaliButton onClick={handleReveal} isLoading={isRevealing} />
        </div>
      </div>

      {/* Fullscreen Golden Transition Effect on Reveal */}
      <AnimatePresence>
        {isRevealing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0 }}
            className="fixed inset-0 z-50 bg-gradient-to-b from-[#F4E7C8] via-[#E7D1A3] to-[#F8F0DD] flex flex-col items-center justify-center text-kc-maroon p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              <WaxSeal size="lg" label="ॐ" />
              <div className="font-devanagari text-2xl font-bold tracking-widest text-kc-gold-royal">
                ॥ ग्रहस्थिति संकलनम् ॥
              </div>
              <h2 className="font-heading text-2xl font-extrabold tracking-wider">
                Inscribing Cosmic Alignment...
              </h2>
              <p className="font-serif text-sm italic text-kc-text-secondary">
                Calculating solar longitudes, ascendant rashi, and planetary houses for {fullName || 'Observer'}...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
