  const handleBuild = async () => {
    const template = (window as any).selectedTemplate;
    if (!template) {
      setStatus('Please speak an idea first');
      return;
    }

    setBuilding(true);
    setStatus('Creating your app...');
    setDeployedUrl('');

    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template }),
      });

      const data = await response.json();

      if (data.url) {
        setDeployedUrl(data.url);
        setStatus('Your app is live!');
      } else {
        setStatus('Error: ' + data.error);
      }
    } catch (err) {
      setStatus('Build failed — try again');
    }

    setBuilding(false);
  };